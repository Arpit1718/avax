// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    address public owner;
    uint256 public balance;

    event Deposit(address indexed sender, uint256 amount);
    event Withdraw(address indexed sender, uint256 amount);
    event BalanceMultiplied(uint256 previousBalance, uint256 newBalance);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() payable {
        owner = msg.sender;
        balance = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit() public payable {
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        require(balance >= _withdrawAmount, "Insufficient balance");
        balance -= _withdrawAmount;
        payable(msg.sender).transfer(_withdrawAmount);
        emit Withdraw(msg.sender, _withdrawAmount);
    }

    function multiplyBalance(uint256 _multiplier) public onlyOwner {
        uint256 newBalance = balance * _multiplier;
        emit BalanceMultiplied(balance, newBalance);
        balance = newBalance;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
