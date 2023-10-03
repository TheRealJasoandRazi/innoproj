const TransactionStorage = artifacts.require("TransactionStorage");

module.exports = function (deployer) {
  // Deploy the TransactionStorage contract
  deployer.deploy(TransactionStorage);
};
