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
