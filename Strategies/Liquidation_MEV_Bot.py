import time
from web3 import Web3

# Replace with your own Infura API key or use another Ethereum provider
API_KEY = "YOUR_INFURA_API_KEY"
w3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{API_KEY}"))

# Aave LendingPool contract address and ABI
LENDING_POOL_ADDRESS = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
LENDING_POOL_ABI = [...]  # Add the ABI for the Aave LendingPool contract here

# Aave Liquidation threshold (example: 0.85 for 85%)
LIQUIDATION_THRESHOLD = 0.85

lending_pool = w3.eth.contract(address=LENDING_POOL_ADDRESS, abi=LENDING_POOL_ABI)

def check_liquidation(address):
    account_data = lending_pool.functions.getUserAccountData(address).call()
    health_factor = account_data[5] / 1e18

    if health_factor < LIQUIDATION_THRESHOLD:
        print(f"User {address} is under-collateralized (Health Factor: {health_factor}): Liquidation opportunity")
    else:
        print(f"User {address} is safe (Health Factor: {health_factor})")

# Replace with the addresses you want to monitor
addresses_to_monitor = ["0x..."]

while True:
    for address in addresses_to_monitor:
        check_liquidation(address)
    time.sleep(60)  # Check every minute