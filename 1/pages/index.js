import { useState, useEffect } from "react";
import { ethers } from "ethers";
import assessmentAbi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [ownerError, setOwnerError] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the actual contract address
  const atmABI = assessmentAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(new ethers.providers.Web3Provider(window.ethereum));
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.send("eth_requestAccounts");
      handleAccount(accounts);
      getATMContract();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const getATMContract = () => {
    const signer = ethWallet.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const atmBalance = await atm.getBalance();
      setBalance(atmBalance.toNumber());

      if (account) {
        const provider = ethWallet.getSigner(account);
        const wallet = await provider.getBalance();
        setWalletBalance(ethers.utils.formatEther(wallet));
      }
    }
  };

  const deposit = async (amount) => {
    if (atm) {
      try {
        const tx = await atm.deposit({ value: ethers.utils.parseEther(amount.toString()) });
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async (amount) => {
    if (atm) {
      try {
        const tx = await atm.withdraw(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const multiplyValue = async (multiplier) => {
    if (atm) {
      try {
        const tx = await atm.multiplyBalance(multiplier);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error multiplying balance:", error);
      }
    }
  };

  const transferOwnership = async (newOwner) => {
    if (atm && newOwner) {
      try {
        const tx = await atm.transferOwnership(newOwner);
        await tx.wait();
        alert(`Ownership transferred to ${newOwner}`);
      } catch (error) {
        setOwnerError(true);
        setTimeout(() => {
          setOwnerError(false);
        }, 5000);
      }
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount} className="connect-button">
          Connect Your MetaMask Wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="user-container">
        <p className="user-info">Your Account: {account}</p>
        <p className="user-info">ATM Balance: {balance} ETH</p>
        <p className="user-info">MetaMask Balance: {walletBalance} ETH</p>

        <div className="action-buttons">
          <label className="action-label">Deposit:</label>
          <button onClick={() => deposit(1)}>1 ETH</button>
          <button onClick={() => deposit(2)}>2 ETH</button>
          <button onClick={() => deposit(5)}>5 ETH</button>
          <button onClick={() => deposit(10)}>10 ETH</button>

          <label className="action-label">Withdraw:</label>
          <button onClick={() => withdraw(1)}>1 ETH</button>
          <button onClick={() => withdraw(2)}>2 ETH</button>
          <button onClick={() => withdraw(5)}>5 ETH</button>
          <button onClick={() => withdraw(10)}>10 ETH</button>

          <label className="action-label">Multiply:</label>
          <button onClick={() => multiplyValue(2)}>2x</button>
          <button onClick={() => multiplyValue(3)}>3x</button>
          <button onClick={() => multiplyValue(4)}>4x</button>
          <button onClick={() => multiplyValue(5)}>5x</button>

          <button
            onClick={() => {
              const newOwner = prompt("Enter the new owner address:");
              transferOwnership(newOwner);
            }}
            className="transfer-button"
          >
            Change Owner
          </button>
        </div>
        {ownerError && <p className="error">Error: Unable to change the Owner</p>}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #333;
          color: #fff;
          padding: 20px;
        }

        .connect-button {
          background-color: #00aaff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
        }

        .user-container {
          margin-top: 20px;
        }

        .user-info {
          font-size: 18px;
          margin: 5px 0;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 20px;
        }

        .action-label {
          font-size: 16px;
          margin-right: 10px;
        }

        button {
          background-color: #00aaff;
          color: #fff;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin: 5px;
        }

        .transfer-button {
          margin-top: 20px;
        }

        .error {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </main>
  );
}
