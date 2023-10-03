// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransactionStorage {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 asset_uid; 
        uint256 timestamp;
    }

    Transaction[] public transactions;

    // Function to add a new transaction
    function addTransaction(address _receiver, uint256 _amount, uint256 _asset_uid) public {
        Transaction memory newTransaction = Transaction({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            asset_uid: _asset_uid,
            timestamp: block.timestamp
        });
        transactions.push(newTransaction);
    }

    // Function to get the number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    // Function to get transaction details by index
    function getTransaction(
        uint256 index
    ) public view returns (Transaction memory) {
        if (transactions.length == 0) {
            // No transactions exist, return a message
            return Transaction(address(0), address(0), 0, 0, 0);
        }

        if (index > transactions.length) {
            // No transactions exist, return a message
            return Transaction(address(0), address(0), 0, 0, 0);
        }

        if (index < 0) {
            // No transactions exist, return a message
            return Transaction(address(0), address(0), 0, 0, 0);
        }

        return transactions[index];
    }
}
