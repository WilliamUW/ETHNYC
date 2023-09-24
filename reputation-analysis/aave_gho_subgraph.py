import requests
import pandas as pd
import json
import numpy as np
import subgraphs

## Aave GHO queries

# https://thegraph.com/explorer/subgraphs/HB1Z2EAw4rtPRYVb2Nz8QGFLHCpym6ByBX6vbCViuE9F?view=Playground&chain=mainnet
API_KEY = 'dc600989321fa0012e06d1a111a29d60'
BASE_API_URL = 'https://gateway.thegraph.com/api/'
API_URL = f"{BASE_API_URL}{API_KEY}/subgraphs/id/HB1Z2EAw4rtPRYVb2Nz8QGFLHCpym6ByBX6vbCViuE9F"

def tokens():
    
    return

def main():
    df = find_user_by_address("0x000000aaee6a496aaf7b7452518781786313400f")
    print(df)
    return

if __name__ == "__main__":
    main()