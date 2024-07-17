const ethers = require("ethers");
const contractJSON = require("./build/contracts/MyCrowdsale.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/utolIPXsUJOqQETyX0Zs6iefoh76EK8r"
);

const walletPrivateKey = "4477af51d49cb98ee71a21a9586aaf96876601ee1b5e2f719b9fec36484bdeb6"; 
const wallet = new ethers.Wallet(walletPrivateKey, provider);

const contractAddress = "0xc0CF827Fc0e0723da4A715B4BE571163eA7dbe74"; 
const contractABI = contractJSON.abi;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

async function buyTokens(amountInEther) {
  try {
    const tx = await contract.buyTokens({
      value: ethers.utils.parseEther(amountInEther.toString()),
      gasLimit: 100000, // Adjust gas limit as needed
    });

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction receipt:", receipt);

    console.log(`Successfully bought tokens with ${amountInEther} Ether`);
  } catch (error) {
    console.error("Error in buyTokens:", error);
    if (error.transactionHash) {
      const txError = await provider.getTransactionReceipt(error.transactionHash);
      console.error("Transaction error details:", txError);
    }
  }
}

// Example usage:
(async () => {
  const amountInEther = 0.0001; // Replace with the amount of Ether you want to spend
  await buyTokens(amountInEther);
})();
