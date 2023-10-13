const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");
const mysql = require("mysql");
const TransactionStorage = require("./build/contracts/TransactionStorage.json");
const web3 = new Web3("http://127.0.0.1:8545"); // Connect to a local Ethereum node

let contract;
async function initializeContract() {
  const networkId = await web3.eth.net.getId(); // Wait for network ID to resolve
  const deployedNetwork = TransactionStorage.networks[networkId];

  if (!deployedNetwork) {
    throw new Error("Contract is not deployed on the current network");
  }

  contract = new web3.eth.Contract(
    TransactionStorage.abi,
    deployedNetwork.address
  );

  console.log("Contract initialization complete!");
}

initializeContract();

const api = express();

var con = mysql.createConnection({
  host: "feenix-mariadb.swin.edu.au",
  user: "s103983638",
  password: "070204",
  database: "s103983638_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

api.use(cors());
api.use(bodyParser.json());

/*************************************************************************
 * Params (URL Parameter) -
 * - id: Number (required) - The user's ID to retrieve the wallet balance.

 * Response (JSON) -
 * - 200: OK. Returns the user's wallet balance in Ether.
 * - 404: Not Found. User not found with the given ID.
 * - 500: Internal Server Error. Database query or Ethereum call failed.
 *************************************************************************/
api.get("/balance/:id", (req, res) => {
  const id = parseInt(req.params.id); // Extract the user ID from the request parameters.

  // Query the database to retrieve the user's wallet address based on the user ID.
  con.query(
    `SELECT Wallet_Address AS Wallet FROM Account WHERE Account_ID = ${id};`,
    function (err, result) {
      if (err) {
        // If there's an error with the database query, respond with a 500 Internal Server Error.
        res.status(500).json({ error: "Internal Server Error" });
      } else if (result.length === 0) {
        // If no user is found with the given ID, respond with a 404 Not Found.
        res.status(404).json({ error: "User not found" });
      } else {
        // User exists in the database. Now, retrieve the wallet balance.

        web3.eth
          .getBalance(result[0].Wallet)
          .then((balance) => {
            // Convert the balance from Wei to Ether.
            const balanceInEther = web3.utils.fromWei(balance, "ether");

            // Respond with a 200 OK status and the user's wallet balance in Ether.
            res.status(200).json({ Balance: `${balanceInEther} ETH` });
          })
          .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
      }
    }
  );

  // Return the response.
  return res;
});

/*************************************************************
 * Only requires the assets and the buyer to be sent. All other data will be retrieved from the database.
 * Assumes that the assets entered are not owned by the buyer.
 * Will fail the transaction for all assets if the buyer cannot buy all assets in the transaction.
 *
 * Params (Request Body) -
 * - assets: Array (required) - An array of asset IDs to be purchased.
 * - buyer: Number (required) - The ID of the buyer.
 *
 * Response (JSON) -
 * - 200: Transactions completed successfully.
 * - 400: Bad request if required fields are missing.
 * - 406: Assets should be sent as a collection.
 * - 450: Insufficient funds in the buyer's wallet.
 * - 500: Internal server error for other issues.
 *************************************************************/
api.post("/create-transaction", (req, res) => {
  const td = req.body; //Transaction Data

  if (!td.assets || !td.buyer) {
    return res.status(400).json({ error: "Missing information" });
  }

  if (!Array.isArray(td.assets)) {
    return res
      .status(406)
      .json({ error: "Assets should be sent in as a collection" });
  }

  con.query(
    `SELECT Wallet_Address AS Wallet, Username FROM Account WHERE Account_ID = ${td.buyer};`,
    function (err, result) {
      if (err || result.length === 0) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const buyer_wallet = result[0].Wallet;
        const buyer_name = result[0].Username;

        con.query(
          `SELECT Account.Wallet_Address AS Wallet, Account.Account_ID AS AccID, Account.Username AS Username, Personal_Assets.Asset_ID AS ID, Asset.Price AS Price FROM Account JOIN Personal_Assets ON Account.Account_ID = Personal_Assets.Account_ID JOIN Asset ON Personal_Assets.Asset_ID = Asset.Asset_ID WHERE Personal_Assets.Asset_ID IN (${td.assets.join(
            ", "
          )});`,
          function (err, result) {
            if (err || result.length === 0) {
              console.error(err);
              // Return a JSON response with a 500 server-side error
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              const seller = result.map((data) => ({
                Wallet: data.Wallet,
                ID: data.ID,
                Price: data.Price,
                AccID: data.AccID,
                Username: data.Username,
              }));

              //Calculate Total price and make sure buyer has enough funds
              const totalPrice = seller.reduce(
                (total, item) => total + parseFloat(item.Price),
                0
              );

              web3.eth
                .getBalance(buyer_wallet)
                .then((balance) => {
                  // Convert the balance from Wei to Ether.
                  const balanceInEther = web3.utils.fromWei(balance, "ether");

                  if (totalPrice > balanceInEther) {
                    res
                      .status(450)
                      .json({ error: "Insufficient funds in wallet." });
                  } else {
                    seller.map((i) => {
                      const priceWei = parseFloat(i.Price) * 1e18;
                      contract.methods
                        .addTransaction(
                          i.Wallet, // _receiver (address payable)
                          parseInt(i.ID),
                          parseInt(i.AccID),
                          td.buyer,
                          i.Username,
                          buyer_name
                        )
                        .send({
                          from: buyer_wallet, // The address sending the transaction
                          value: priceWei, // The amount to send with the transaction
                          gas: 5000000,
                        })
                        .on("receipt", function (receipt) {
                          con.query(
                            `UPDATE Personal_Assets SET Account_ID = ${td.buyer} WHERE Asset_ID = ${i.ID};`,
                            function (error, result) {
                              if (error) {
                                console.error(`Error: ${error}`);
                                res
                                  .status(500)
                                  .json({ error: "Internal Server Error" });
                              }
                            }
                          );
                        })
                        .on("error", function (error) {
                          // Transaction encountered an error
                          console.error("Transaction error:", error);
                          res
                            .status(500)
                            .json({ error: "Internal Server Error" });
                        });
                    });
                    if (res.status !== 500) {
                      res
                        .status(200)
                        .json({ message: "Transactions compeleted" });
                    }
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  res.status(500).json({ error: "Internal Server Error" });
                });
            }
          }
        );
      }
    }
  );

  return res;
});

/**************************************************************************************
 * Params (Request Body) -
 * - wallet: String (required) - The wallet address for which to retrieve transactions.

 * Response (JSON) -
 * - 200: OK. Returns the list of transactions as a JSON string.
 * - 500: Internal Server Error. An error occurred during the transaction retrieval.
 **************************************************************************************/
api.get("/transactions/:wallet", (req, res) => {
  const wallet = req.params.wallet; // Extract the wallet address from the request parameter.

  // Use the contract's 'getTransactionsByWallet' method to retrieve transactions for the specified wallet address.
  contract.methods
    .getTransactionsByWallet(wallet)
    .call()
    .then((transactions) => {
      // Respond with a 200 OK status and the list of transactions as a JSON string.

      const Transactions = transactions.map((transaction) => {
        // Convert asset_uid to an integer
        const assetUid = parseInt(transaction[7]);

        // Convert timestamp to a Date object
        const timestamp = new Date(Number(transaction[8]) * 1000);

        // Create and return an object with the key-value pairs
        return {
          sender_addr: String(transaction[0]),
          receiver_addr: String(transaction[1]),
          sender: parseInt(transaction[2]),
          receiver: parseInt(transaction[3]),
          sender_nme: String(transaction[4]),
          receiver_nme: String(transaction[5]),
          amount: parseFloat(transaction[6]) / 1e18,
          asset_uid: assetUid,
          timestamp: timestamp,
        };
      });

      res.status(200).json({ message: Transactions });
    })
    .catch((error) => {
      // Handle any errors that occur during the transaction retrieval.
      console.error("Error:", error);

      // Respond with a 500 Internal Server Error status and an error message.
      res.status(500).json({ error: "Internal Server Error" });
    });
  return res;
});

/*************************************************************
 * Params (Request Body) -
 * - usr_nme: String (required) - The username of the user.
 * - pwd: String (required) - The user's password.
 * - wallet_add: String (required) - The user's wallet address.
 * - prvt_key: String (required) - The user's private key.
 *
 * Response (JSON) -
 * - 200: User created successfully.
 * - 400: Bad request if required fields are missing.
 * - 402: Username is not at least 4 characters.
 * - 422: User already exists or wallet address already used.
 * - 401: Unauthorized if private key authentication fails.
 * - 500: Internal server error for other issues.
 *************************************************************/
api.post("/new-user", (req, res) => {
  const user_data = req.body;

  // Check if "usr_nme", "pwd", "wallet_add" and "prvt_key" exists
  if (
    !user_data.usr_nme ||
    !user_data.pwd ||
    !user_data.wallet_add ||
    !user_data.prvt_key
  ) {
    return res.status(400).json({ error: "Missing information" });
  }

  if (user_data.usr_nme.length >= 4) {
    return res
      .status(402)
      .json({ error: "Username is not alteast 4 characters" });
  }

  con.query(
    `SELECT * FROM Account WHERE Username = ${user_data.usr_nme};`,
    function (err, result) {
      if (err) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        res.status(500).json({ error: "Internal Server Error" });
      } else if (result.length === 1) {
        // User exists in the database
        // Return 422 user already exists
        res.status(422).json({ error: "User already exists" });
      } else {
        con.query(
          "SELECT MAX(Account_ID) AS ID FROM Account;",
          function (err, result) {
            if (err || result.length === 0) {
              console.error(err);
              // Return a JSON response with a 500 server-side error
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              const user_id = parseInt(result[0].ID) + 1;

              con.query(
                `SELECT * FROM Account WHERE Wallet_Address = ${user_data.wallet_add};`,
                function (err, result) {
                  if (err) {
                    console.error(err);
                    // Return a JSON response with a 500 server-side error
                    res.status(500).json({ error: "Internal Server Error" });
                  } else if (result.length === 1) {
                    // wallet already used in the database
                    // Return 422 wallet already used
                    res.status(422).json({ error: "Wallet already used" });
                  } else {
                    web3.eth.accounts
                      .privateKeyToAccount(privateKey)
                      .then((account) => {
                        if (user_data.wallet_add !== account.address) {
                          res.status(401).json({
                            error:
                              "Invalid private key. Authentication failed.",
                          });
                        } else {
                          con.query(
                            `INSERT INTO Account(Account_ID, Username, Password, Wallet_Address) VALUES (${user_id}, '${user_data.usr_nme}', '${user_data.pwd}', '${user_data.wallet_add}');`,
                            function (err, result) {
                              if (err) {
                                console.error(err);
                                // Return a JSON response with a 500 server-side error
                                res
                                  .status(500)
                                  .json({ error: "Internal Server Error" });
                              } else {
                                res.status(200).json({
                                  message: "User created successfully",
                                });
                              }
                            }
                          );
                        }
                      });
                  }
                }
              );
            }
          }
        );
      }
    }
  );

  return res;
});

/*************************************************************
 * Params (Request Body) -
 * - username: String (required) - The username of the user.
 * - password: String (required) - The user's password.
 *
 * Response (JSON) -
 * - 200: Authentication successful. Returns user information.
 * - 400: Bad request if required fields are missing.
 * - 401: Unauthorized if the password doesn't match.
 * - 404: User not found if the user doesn't exist.
 * - 500: Internal server error for other issues.
 *************************************************************/
api.post("/auth", (req, res) => {
  const user_data = req.body;

  // Check if "username" and "password" fields exist in the request body
  if (!user_data.username || !user_data.password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  //Check if user exists
  return con.query(
    `SELECT * FROM Account WHERE Username = '${user_data.username}';`,
    function (err, result) {
      if (err) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        // User doesn't exist in the database
        // Return a JSON response with a 404 user not found
        return res.status(404).json({ error: "User not found" });
      }

      //check if user_data.password and Password match
      if (user_data.password !== result[0].Password) {
        // Passwords don't match
        // Return a JSON response with an authentication error
        return res.status(401).json({ error: "Authentication failed" });
      }

      // Return a JSON response with an authentication success
      // Delete password from result to main integrity of security
      delete result[0].Password;

      return res.status(200).json({ user: result[0] });
    }
  );
});

// Remove before final release
api.get("/test", (req, res) => {
  return res.status(200).json({ message: "connected" });
});

/******************************************************
 * Params (URL Parameter) -
 * - id: Number (required) - The asset ID to retrieve.
 *
 * Response (JSON) -
 * - 200: Returns asset information if the ID exists.
 * - 404: ID not found if the ID doesn't exist.
 * - 500: Internal server error for other issues.
 *****************************************************/
api.get("/assets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  //check if id exists in db
  id_exists = con.query(
    `SELECT * FROM Asset WHERE Assset_ID = ${id};`,
    function (err, result) {
      if (err) {
        console.error(err);
        // Return a 500 server-side error
        return "Internal Server Error";
      }

      if (result.length === 0) {
        // Database return no results
        // Return a 500 server-side error
        return "ID Doesn't Exist";
      }

      return "ID Exists";
    }
  );

  if (id_exists === "Internal Server Error") {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (id_exists === "ID Doesn't Exist") {
    return res.status(404).json({ error: "ID not found" });
  }

  query = `SELECT Asset.*, Account.Account_ID, Account.Username, Account.Wallet_Address FROM Asset JOIN Personal_Assets ON Personal_Assets.Asset_ID = Asset.Asset_ID JOIN Account ON Personal_Assets.Account_ID = Account.Account_ID WHERE Asset.Asset_ID = ${id} ;`;

  return con.query(query, function (err, result) {
    if (err) {
      console.error(err);
      // Return a JSON response with a 500 server-side error
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      // Database return no results
      // Return a JSON response with a 500 server-side error
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ data: result });
  });
});

/*****************************************************************************************
 * Params -
 * - startIndex: Number (required) - The starting index to retrieve assets.
 * - count: Number (required) - The number of assets to retrieve.
 * - sortPrice: String (required) - Sorting order for price ('a' for ascending, 'd' for descending).
 * - sortRarity: String (required) - Sorting order for rarity ('a' for ascending, 'd' for descending).
 * - id: Number - User ID for filtering assets not owned by the user.
 * - owner: Number - User ID for filtering assets owned by the user.
 * - keywords: Array of Strings - Keywords for filtering assets.
 * - background: String - Category filter for background.
 * - ears: String - Category filter for ears.
 * - eye: String - Category filter for eye.
 * - hair: String - Category filter for hair.
 * - head: String - Category filter for head.
 * - mouth: String - Category filter for mouth.
 * - nose: String - Category filter for nose.
 *
 * Response (JSON) -
 * - 200: OK. Returns the list of assets matching the criteria.
 * - 400: Bad Request. Required parameters are missing or not in the correct format.
 * - 415: Unsupported Media Type. Sorting parameters are not in the format of 'a' or 'd'.
 * - 500: Internal Server Error. Database query or server-side error.
 ********************************************************************************************/
api.post("/assets", (req, res) => {
  const data = req.body;

  // The data is quite large so the endpoint requires user to send a startIndex and count e.g. images 10 - 20 (startIndex - count)
  if (!data.startIndex || !data.count || !data.sortPrice || !data.sortRarity) {
    return res.status(400).json({ error: "required params not sent" });
  }

  if (
    !(
      (data.sortPrice === "a" || data.sortPrice === "d") &&
      (data.sortRarity === "a" || data.sortRarity === "d")
    )
  ) {
    return res
      .status(415)
      .json({ error: "Sorting params are to be in the format of 'a' or 'd'." });
  }

  let fil_id = ""; //User ID filter

  let fil_keys = ""; //Search by keywords

  let fil_ctgrs = ""; //Filter by categories

  let sort = ` ORDER BY Rarity ${
    data.sortRarity === "a" ? "ASC" : "DESC"
  }, Price ${data.sortPrice === "a" ? "ASC" : "DESC"} `;

  if (data.id) {
    fil_id = ` AND Asset_ID NOT IN (SELECT Asset_ID FROM Personal_Assets WHERE Account_ID = ${data.id}) `;
  }

  if (data.owner) {
    fil_id = `AND Asset_ID IN (SELECT Asset_ID FROM Personal_Assets WHERE Account_ID = ${data.id})`;
  }

  if (data.keywords) {
    if (!Array.isArray(data.keywords)) {
      return res.status(400).json({ error: "Keywords must be a collection" });
    }
    data.keywords.map((keyword) => {
      fil_keys += ` AND Keywords LIKE '%${keyword}%' `;
    });
  }

  // Applying category filters
  if (data.background) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.background}%' `;
  }
  if (data.ears) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.ears}%' `;
  }
  if (data.eye) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.eye}%' `;
  }
  if (data.hair) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.hair}%' `;
  }
  if (data.head) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.head}%' `;
  }
  if (data.mouth) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.mouth}%' `;
  }
  if (data.nose) {
    fil_ctgrs += ` AND Keywords LIKE '%${data.nose}%' `;
  }

  let query = `SELECT * FROM Asset WHERE Asset_ID >= ${data.startIndex} ${fil_keys} ${fil_ctgrs} ${fil_id} ${sort} LIMIT ${data.count};`;

  con.query(query, function (err, result) {
    if (err) {
      console.error("Error :", err);
      // Return a JSON response with a 500 server-side error
      res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      // Database return no results
      // Return a JSON response with a 500 server-side error
      res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ data: result });
  });

  return res;
});

api.listen(4000, "0.0.0.0", () => {
  console.log("Server listening on 0.0.0.0:4000");
});
