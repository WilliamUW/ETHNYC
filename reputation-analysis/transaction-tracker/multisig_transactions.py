import subprocess
import json

# Install or upgrade safe-cli
subprocess.run(["pip3", "install", "-U", "safe-cli"])


# safe-cli 0xa5F623b3f1E0EEe821eED3D0A0e9C98e3f784284 https://eth-mainnet.g.alchemy.com/v2/BSN2Q0XH23RbxgAm4qMKWyZoy1uinn4a

# Set the Ethereum address and Alchemy API URL
eth_address = "0xa5F623b3f1E0EEe821eED3D0A0e9C98e3f784284"
alchemy_api_url = "https://eth-mainnet.g.alchemy.com/v2/BSN2Q0XH23RbxgAm4qMKWyZoy1uinn4a"

# Run safe-cli to set up the environment
subprocess.run(["safe-cli " + eth_address + " " + alchemy_api_url], "--background")

# Run tx-service
subprocess.Popen(["tx-service", "--background"])

# Run balances and store the output as a dictionary
balances_output = subprocess.check_output(["balances"])
balances_output = balances_output.decode("utf-8")

# Run history and store the output as a dictionary
txHash = subprocess.check_output(["history"])
txHash = history_output.decode("utf-8")

 
output_data = {
    "eth_address": eth_address,
    "balance": balances_output,
    "safeTxHash": txHash
}

# Save the output as JSON
with open("output.json", "w") as json_file:
    json.dump(output_data, json_file, indent=4)
