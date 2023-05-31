const Web3 = require("web3");
// Replace with your own BSC (or other blockchain) provider URL
const PROVIDER_URL = "https://bsc-dataseed.binance.org/";
const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));

web3.eth.subscribe("pendingTransactions", (error, txHash) => {
  if (error) {
    console.error("Error while subscribing to pending transactions:", error);
    return;
  }

  web3.eth.getTransaction(txHash, (error, transaction) => {
    if (error) {
      console.error("Error while fetching transaction:", error);
      return;
    }

    console.log("Pending transaction detected:", {
      from: transaction.from,
      to: transaction.to,
      value: parseFloat(web3.utils.fromWei(transaction.value, "ether")),
      gasPrice: parseFloat(web3.utils.fromWei(transaction.gasPrice, "gwei")),
    });
  });
});

console.log("Monitoring BSC mempool for pending transactions...");