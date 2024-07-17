const ConfigurableICOToken = artifacts.require("MyToken");

module.exports = async function(deployer, network, accounts) {
  try {

    const initialOwner = accounts[0]; // Use the first account as the initial owner

    await deployer.deploy(ConfigurableICOToken, initialOwner);

    const deployedInstance = await ConfigurableICOToken.deployed();
    console.log("Contract deployed at:", deployedInstance.address);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
};
