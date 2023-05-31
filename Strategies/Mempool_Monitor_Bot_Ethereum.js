const API_KEY = "your_infura_api_key";
const provider = new providers.InfuraProvider("homestead", API_KEY);

provider.on("pending", async (txHash) => {
    try {
        const transaction = await provider.getTransaction(txHash);
        console.log("Pending transaction detected:", {
            from: transaction.from,
            to: transaction.to,
            value: parseFloat(provider.utils.formatEther(transaction.value)),
            gasPrice: parseFloat(provider.utils.formatUnits(transaction.gasPrice, "gwei")),
        });
    } catch (error) {
        console.error("Error while processing transaction:", error);
    }
});

console.log("Monitoring mempool for pending transactions...");