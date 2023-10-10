const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");
const mysql = require("mysql");
const TransactionStorage = require("./build/contracts/TransactionStorage.json");

const web3 = new Web3("http://127.0.0.1:8545"); // Connect to a local Ethereum node

const api = express();

var con = mysql.createConnection({
  host: "feenix-mariadb.swin.edu.au",
  user: "s103983638",
  password: "070204",
  database: "s103983638_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

api.use(cors());
api.use(bodyParser.json());

/***
 * should check if the wallet addresses of the payee and payable are correct
 * should check if the payee is in possesion of the asset
 * should run the transaction and check for proper response
 *  if there are errors they should be handled appropriatly
 *  if no errors and transaction was successfully recorded
 *    then asset should be moved from payees account to payables account in the db
 * endpoint should then send success response
 * */
api.post("/create-transaction", (req, res) => {});

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

  user_exists = con.query(
    "SELECT * FROM Account WHERE Username = '" + user_data.usr_nme + "';",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        return 500;
      }

      if (result.length === 1) {
        // User exists in the database
        // Return 422 user already exists
        return 422;
      }

      return 200;
    }
  );

  if (user_exists === 500) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  if (user_exists === 422) {
    res.status(422).json({ error: "User already exists" });
  }

  user_id = con.query(
    "SELECT MAX(Account_ID) AS ID FROM Account;",
    function (err, result, fields) {
      if (err || result.length === 0) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        return 500;
      }
      return parseInt(result[0].ID) + 1;
    }
  );

  if (user_id === 500) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  wallet_exists = con.query(
    "SELECT * FROM Account WHERE Wallet_Address = '" +
      user_data.wallet_add +
      "';",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        return 500;
      }

      if (result.length === 1) {
        // User exists in the database
        // Return 422 wallet already used
        return 422;
      }

      return 200;
    }
  );

  if (wallet_exists === 500) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  if (wallet_exists === 422) {
    res.status(422).json({ error: "Wallet already used" });
  }

  account = web3.eth.accounts.privateKeyToAccount(privateKey);

  if (user_data.wallet_add !== account.address) {
    return res
      .status(401)
      .json({ error: "Invalid private key. Authentication failed." });
  }

  return con.query(
    "INSERT INTO Account(Account_ID, Username, Password, Wallet_Address) VALUES(" +
      user_id +
      ",'" +
      user_data.usr_nme +
      "', '" +
      user_data.pwd +
      "', '" +
      user_data.wallet_add +
      "');",
    function (err, result, fields) {
      if (err) {
        console.error(err);
        // Return a JSON response with a 500 server-side error
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.status(200).json({ message: "User created successfully" });
    }
  );
});

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
    "SELECT * FROM Account WHERE Username = '" + user_data.username + "';",
    function (err, result, fields) {
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

api.post("/test", (req, res) => {
  return res.status(200).json({ message: "connected" });
});

api.get("/assets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  //check if id exists in db
  id_exists = con.query(
    "SELECT * FROM Asset WHERE Assset_ID = " + id + ";",
    function (err, result, fields) {
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

  query =
    "SELECT Asset.*, Account.Account_ID, Account.Username, Account.Wallet_Address FROM Asset JOIN Personal_Assets ON Personal_Assets.Asset_ID = Asset.Asset_ID JOIN Account ON Personal_Assets.Account_ID = Account.Account_ID WHERE Asset.Asset_ID = " +
    id +
    ";";

  return con.query(query, function (err, result, fields) {
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

/**
 * To Do -
 *
 * add filter's and sorting as requirements in the body
 * add search filtering as requirments in the body
 * add sorting by different settings as requirement in the body
 * */
api.post("/assets", (req, res) => {
  const data = req.body;

  // The data is quite large so the endpoint requires user to send a startIndex and count e.g. images 10 - 20 (startIndex - count)
  if (!data.startIndex || !data.count) {
    return res.status(400).json({ error: "startIndex and count are required" });
  }

  query =
    "SELECT * FROM Asset WHERE Asset.Asset_ID >= " +
    data.startIndex +
    " LIMIT " +
    data.count +
    ";";

  // Big Brain Query
  if (data.id) {
    query =
      "SELECT * FROM Asset WHERE Asset.Asset_ID >= " +
      data.startIndex +
      " AND Asset.Asset_ID NOT IN ( SELECT Personal_Assets.Asset_ID FROM Personal_Assets WHERE Personal_Assets.Account_ID = " +
      data.id +
      " ) LIMIT " +
      data.count +
      ";";
  }

  return con.query(query, function (err, result, fields) {
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

api.listen(4000, "0.0.0.0", () => {});

// const init = async () => {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     const networkId = await web3.eth.net.getId();

//     const senderAddress = "0x7b8aBbC11db9FA05984F9B5Fb30E7fc7BB25Cb80";
//     const receiverAddress = "0x7b3F63964A2B1C7Cda2f2fc9f0B2D1edC21a839B";

//     if (!TransactionStorage.networks[networkId]) {
//       throw new Error("Contract not deployed on the current network.");
//     }

//     const deployedNetwork = TransactionStorage.networks[networkId];
//     const contractInstance = new web3.eth.Contract(
//       TransactionStorage.abi,
//       deployedNetwork.address
//     );

//     // Specify the gas limit (e.g., 2 million gas units)
//     const gasLimit = 2000000;

//     // Example: Add a new transaction with a higher gas limit
//     await contractInstance.methods
//       .addTransaction(receiverAddress, 10)
//       .send({ from: senderAddress, gas: gasLimit });

//     // Example: Retrieve transaction count and details
//     const transactionCount = await contractInstance.methods
//       .getTransactionCount()
//       .call();
//     console.log(`Transaction Count: ${transactionCount}`);

//     const transactionIndex = 0; // Change this to the desired index
//     const transaction = await contractInstance.methods
//       .getTransaction(transactionIndex)
//       .call();
//     console.log(`Transaction Details:`, transaction);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// init();
