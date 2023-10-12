// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransactionStorage {
    struct Transaction {
        address sender_addr; //buyer wallet address
        address receiver_addr; //seller wallet address
        uint256 sender; //unique identifier of buyer
        uint256 receiver; //unique identifier of seller
        string sender_nme; //buyer name
        string receiver_nme; //seller name
        uint256 amount; //price to buy nft - amount is represented in wei
        uint256 asset_uid; //unique identifer of nft
        uint256 timestamp; //timestamp of transaction
    }

    Transaction[] public transactions;

    // Function to add a new transaction
    function addTransaction(
        address payable _receiver_addr,
        uint256 _asset_uid,
        uint256 _receiver,
        uint256 _sender,
        string memory _sender_nme,
        string memory _receiver_nme
    ) public payable {
        // Ensure the sender has enough Ether to cover the net amount
        require(
            msg.sender.balance >= msg.value,
            "Insufficient balance to cover net amount"
        );

        // Transfer the net amount to the receiver
        _receiver_addr.transfer(msg.value);

        // Record the transaction
        Transaction memory newTransaction = Transaction({
            sender_addr: msg.sender,
            receiver_addr: _receiver_addr,
            sender: _sender,
            receiver: _receiver,
            sender_nme: _sender_nme,
            receiver_nme: _receiver_nme,
            amount: msg.value,
            asset_uid: _asset_uid,
            timestamp: block.timestamp
        });
        transactions.push(newTransaction);
    }

    // Function to get the number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    // Function to get transaction details by index
    function getTransactionByIndex(
        uint256 index
    ) public view returns (Transaction memory) {
        Transaction memory t = Transaction(address(0), address(0), 0, 0, "", "", 0, 0, 0);

        if (
            (transactions.length == 0) ||
            (index > transactions.length) ||
            (index < 0)
        ) {
            // No transactions exist, return a message
            return t;
        }

        return transactions[index];
    }

    // Function to get all transactions involving a specific wallet address
    function getTransactionsByWallet(
        address wallet
    ) public view returns (Transaction[] memory) {
        uint256 count = 0;
        uint256 length = transactions.length;

        // Count the number of relevant transactions involving the specified wallet
        for (uint256 i = 0; i < length; i++) {
            if (
                transactions[i].sender_addr == wallet ||
                transactions[i].receiver_addr == wallet
            ) {
                count++;
            }
        }

        // Create an array to hold the relevant transactions
        Transaction[] memory result = new Transaction[](count);
        uint256 currentIndex = 0;

        // Populate the result array with relevant transactions
        for (uint256 i = 0; i < length; i++) {
            if (
                transactions[i].sender_addr == wallet ||
                transactions[i].receiver_addr == wallet
            ) {
                result[currentIndex] = transactions[i];
                currentIndex++;
            }
        }

        return result;
    }
}
