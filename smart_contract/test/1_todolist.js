// const ConfigurableICOToken = artifacts.require("ConfigurableICOToken");

// module.exports = async function(deployer, network, accounts) {
//   try {
//     const name = "My-Token";
//     const symbol = "MYT";
//     const maxSupply = web3.utils.toWei("1000000", "ether"); // Example max supply (1,000,000 tokens)
//     const tokenPrice = web3.utils.toWei("0.00000001", "ether"); // Example token price (10 wei)
//     const initialOwner = accounts[0]; // Use the first account as the initial owner

//     await deployer.deploy(ConfigurableICOToken, name, symbol, maxSupply, tokenPrice, initialOwner);

//     const deployedInstance = await ConfigurableICOToken.deployed();
//     console.log("Contract deployed at:", deployedInstance.address);
//   } catch (error) {
//     console.error("Deployment failed:", error);
//   }
// };
