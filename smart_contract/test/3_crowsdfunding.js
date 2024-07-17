const Crowdsale = artifacts.require("Crowdsale");

module.exports = async function(deployer, network, accounts) {
  try {
    const cap = web3.utils.toWei("10000", "ether"); 
    const rate = 10; 
    const wallet = accounts[0]; 

  
    const deployedTokenInstance = '0x8133F906cf0b7a9ebf131B896cDE0a4F209397f0'
    await deployer.deploy(Crowdsale, cap, rate, wallet, deployedTokenInstance);

    const deployedCrowdsaleInstance = await Crowdsale.deployed();
    console.log("Crowdsale contract deployed at:", deployedCrowdsaleInstance.address);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
};
