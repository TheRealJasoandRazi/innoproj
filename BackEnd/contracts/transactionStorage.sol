// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransactionStorage {
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 asset_uid;
        uint256 timestamp;
        uint256 gasCharge;
    }

    Transaction[] public transactions;

    // Function to add a new transaction
    function addTransaction(
        address payable _receiver,
        uint256 _amount,
        uint256 _asset_uid
    ) public payable {
        // Calculate the gas cost
        uint256 gasCost = tx.gasprice * gasleft();

        // Calculate the net amount to be transferred
        uint256 netAmount = _amount - gasCost;

        // Ensure the sender has enough Ether to cover the net amount
        require(
            msg.sender.balance >= netAmount,
            "Insufficient balance to cover net amount"
        );

        // Transfer the net amount to the receiver
        _receiver.transfer(netAmount);

        // Record the transaction
        Transaction memory newTransaction = Transaction({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            asset_uid: _asset_uid,
            timestamp: block.timestamp,
            gasCharge: gasCost
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
            return Transaction(address(0), address(0), 0, 0, 0, 0);
        }

        if (index > transactions.length) {
            // No transactions exist, return a message
            return Transaction(address(0), address(0), 0, 0, 0, 0);
        }

        if (index < 0) {
            // No transactions exist, return a message
            return Transaction(address(0), address(0), 0, 0, 0, 0);
        }

        return transactions[index];
    }
}
