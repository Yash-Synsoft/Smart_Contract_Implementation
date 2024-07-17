const Crowdsale = artifacts.require("MyCrowdsale");

module.exports = async function(deployer, network, accounts) {
  try {
    const rate = 10; 
    // const wallet = accounts[0]; 

  
    const deployedTokenInstance = '0x211810A1A1D97B7734111514641ecb2Ae438Fa66'
    await deployer.deploy(Crowdsale,  deployedTokenInstance, rate);

    const deployedCrowdsaleInstance = await Crowdsale.deployed();
    console.log("Crowdsale contract deployed at:", deployedCrowdsaleInstance.address);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
};