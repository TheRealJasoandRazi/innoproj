const TransactionStorage = artifacts.require("../contracts/TransactionStorage");

module.exports = function (deployer) {
  // Deploy the TransactionStorage contract
  deployer.deploy(TransactionStorage);
};
