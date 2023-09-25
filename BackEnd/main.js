const { Web3 } = require("web3");
const TransactionStorage = require("./build/contracts/TransactionStorage.json");

const web3 = new Web3("http://127.0.0.1:8545"); // Connect to a local Ethereum node

const init = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const senderAddress = "0x8AD5B94c74d10F67dd8e3cc146b9DbEcAfE8539F";
    const receiverAddress = "0x1B773f10d2B9Ce7309764742b0ed189B0E443d20";

    if (!TransactionStorage.networks[networkId]) {
      throw new Error("Contract not deployed on the current network.");
    }

    const deployedNetwork = TransactionStorage.networks[networkId];
    const contractInstance = new web3.eth.Contract(
      TransactionStorage.abi,
      deployedNetwork.address
    );

    // Specify the gas limit (e.g., 2 million gas units)
    const gasLimit = 2000000;

    // Example: Add a new transaction with a higher gas limit
    await contractInstance.methods
      .addTransaction(receiverAddress, 10)
      .send({ from: senderAddress, gas: gasLimit });

    // Example: Retrieve transaction count and details
    const transactionCount = await contractInstance.methods
      .getTransactionCount()
      .call();
    console.log(`Transaction Count: ${transactionCount}`);

    const transactionIndex = 0; // Change this to the desired index
    const transaction = await contractInstance.methods
      .getTransaction(transactionIndex)
      .call();
    console.log(`Transaction Details:`, transaction);
  } catch (error) {
    console.error("Error:", error);
  }
};

init();
