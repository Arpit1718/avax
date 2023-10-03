## Project Description

Welcome to our project that combines the power of Ethereum smart contracts and React to create a decentralized ATM (DApp). In this project, I'll guide you through the process of developing a user-friendly interface that interacts with a smart contract deployed on the Ethereum hardhat blockchain. It serves as a simple ATM (Automated Teller Machine) application where users can connect their MetaMask wallet, check their account balances, deposit and withdraw Ether (ETH), multiply their balance, and transfer ownership of the ATM contract.

## Key Features:

    MetaMask Integration: The application seamlessly integrates with MetaMask, a widely used Ethereum wallet browser extension. This integration enables users to securely connect to the Ethereum network, 
    enhancing the overall user experience.

    Smart Contract Interaction: Utilizing an Ethereum smart contract, the application facilitates secure and transparent financial operations. Users can effortlessly deposit and withdraw funds through the smart 
    contract, ensuring the integrity and security of their transactions.

    Real-time Data Updates: The DApp provides real-time updates by fetching and displaying the user's account balance directly from the Ethereum blockchain. This ensures that users have access to accurate and 
    up- to-date financial information at all times.

    User-Friendly Interface: The user interface is thoughtfully designed using React, creating a modern and intuitive experience for users as they interact with this decentralized ATM application. The user 
    interface 
    prioritizes ease of use and accessibility, making it accessible to a wide range of users.

## How It Works:

    Integrating Ethereum Wallet: Users will seamlessly integrate their Ethereum wallet, such as MetaMask, with the DApp. This integration empowers them to interact with the smart contract using their Ethereum 
    account, facilitating secure and convenient transactions within the application

    Viewing Account Balance: Users can view their account balance in the DApp interface. The balance is fetched from the smart contract, providing real-time information.

    Depositing and Withdrawing Funds: Users will be able to deposit and withdraw funds securely through the smart contract. Each action will trigger a transaction on the Ethereum blockchain.

    Multiply Balance Function: This function allows users to multiply their Ethereum account balance within the DApp. Users can choose a multiplier (e.g., 2x, 3x, 4x, or 5x), and this function will perform the 
    multiplication operation on their current account balance stored in the smart contract. This provides users with a simple and efficient way to increase their account balance based on their chosen multiplier.

    Ownership Transfer: Users with ownership can transfer it to another Ethereum address, ensuring flexibility in managing the smart contract

## Smart Contract Explanation

This meticulously crafted smart contract brings the functionality of an ATM to the Ethereum blockchain, enabling users to securely and transparently engage in financial transactions. The contract's design revolves around key state variables that dictate its behavior and interactions.

The contract is structured with key state variables that dictate its behavior and interactions. The owner variable is a crucial element, storing the Ethereum address of the contract's owner. This address holds special privileges within the contract, including the ability to transfer ownership and perform certain authorized actions. Alongside this, the balance variable serves as a repository for the total funds available within the contract, forming the basis for all deposit and withdrawal operations.

To enhance the transparency of the contract's operations, events are emitted at significant junctures. The Deposit event is triggered each time a user deposits funds into the contract, providing information about the deposited amount. Similarly, the Withdraw event is emitted when a user initiates a withdrawal, conveying details about the withdrawn amount. In case of any changes in ownership, the OwnershipTransferred event is employed, indicating both the previous and new owner's Ethereum addresses.

The DApp provides real-time updates, displaying essential information such as the user's Ethereum account balance. Users can stay informed about their financial status at a glance.

Depositing funds is facilitated through the deposit() function, which augments the contract's balance based on the deposited amount. To ensure the integrity of the contract's balance, the withdraw() function enables users to initiate withdrawals, taking into account the requested withdrawal amount and the contract's available balance. Crucially, it prevents users from withdrawing more than the available balance, preserving the contract's financial stability.

For ownership transfer, the transferOwnership() function empowers the current owner to transfer ownership to another Ethereum address. The function validates the legitimacy of the new owner's address before executing the transfer. Notably, the OwnershipTransferred event is triggered to document this change, bolstering transparency.

The contract is fortified with a custom error mechanism. The InsufficientBalance error is triggered if a user attempts to withdraw an amount exceeding the available balance, ensuring the contract's robustness and error handling capabilities.

## After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open terminal in your VS code
3. In the second terminal type : npx hardhat node
4. In the third terminal, type : npx hardhat run --network localhost scripts/deploy.js
5. For last step terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
