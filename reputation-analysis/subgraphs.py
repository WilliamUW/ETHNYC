import requests
import pandas as pd

API_KEY = 'dc600989321fa0012e06d1a111a29d60'
BASE_API_URL = 'https://gateway.thegraph.com/api/'
UMA_API_URL = f"{BASE_API_URL}{API_KEY}/subgraphs/id/41LCrgtCNBQyDiVVyZEuPxbvkBH9BxxLU3nEZst77V8o"
AAVE_API_URL = f"{BASE_API_URL}{API_KEY}/subgraphs/id/HB1Z2EAw4rtPRYVb2Nz8QGFLHCpym6ByBX6vbCViuE9F"

def uma_fetch_data_from_query(query: str) -> dict:
    response = requests.post(UMA_API_URL, json={'query': query})
    print(response.json())
    response.raise_for_status()  # Check for HTTP errors.
    return response.json()['data']

def aave_fetch_data_from_query(query: str) -> dict:
    response = requests.post(AAVE_API_URL, json={'query': query})
    response.raise_for_status()  # Check for HTTP errors.
    return response.json()['data']

def to_dataframe(protocol: str, data_key: str, query: str):
    if protocol == 'UMA':
        json_data = uma_fetch_data_from_query(query)
    elif protocol == 'AAVE':
        json_data = aave_fetch_data_from_query(query)
    else:
        raise ValueError(f"Unsupported protocol: {protocol}")
    return pd.DataFrame(json_data[data_key])