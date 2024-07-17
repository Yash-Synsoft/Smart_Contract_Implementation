const TodoList = require("./build/contracts/TodoList.json");
const { Web3 } = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://eth-sepolia.g.alchemy.com/v2/utolIPXsUJOqQETyX0Zs6iefoh76EK8r"
  )
);

async function sendMoney() {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoList.networks[networkId];
  
      if (!deployedNetwork) {
        throw new Error("Contract not deployed on the detected network.");
      }
  
      const accountFrom = web3.eth.accounts.privateKeyToAccount(
        "0x9f5f393961926840143388874a0016fd3c637795711b2b135e3532087b60642c"
      );
      web3.eth.accounts.wallet.add(accountFrom);
      web3.eth.defaultAccount = accountFrom.address;
  
      const contractInstance = new web3.eth.Contract(
        TodoList.abi,
        deployedNetwork.address
      );
  
      const amount = web3.utils.toWei("0.0001", "ether");
  
      const gasEstimate = await contractInstance.methods.makePayment().estimateGas({
        from: accountFrom.address,
        value: amount,
      });
  
      const tx = {
        from: accountFrom.address,
        to: deployedNetwork.address,
        data: contractInstance.methods.makePayment().encodeABI(),
        gas: gasEstimate,
        maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
        maxFeePerGas: web3.utils.toWei('100', 'gwei'),
        value: amount,
      };
  
      const signedTx = await web3.eth.accounts.signTransaction(tx, accountFrom.privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log(`Payment of Ether successful. Transaction hash: ${receipt.transactionHash}`);
    } catch (error) {
      console.error("Error in sendMoney:", error);
    }
  }
  

sendMoney();
