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

def voterGroups(num: int) -> pd.DataFrame:
    query = f"""
    {{
        voterGroups(first: {num}){{
            id
            price
            round
            votes{{
                id
            }}
            totalVoteAmount
            votersAmount
            won
        }}
    }}
    """
    return to_dataframe('voterGroups', query)

def userDescendingByNumCorrectVotes():
    query = """
    {
        users(where: {countRetrievals_not: null}, orderBy: countRetrievals, orderDirection: desc) {
            id
            address
            countReveals
            countRetrievals
            votesCommited{
                id
            }
        }
    }
    """
    return to_dataframe('users', query)

def userDescendingByNumVotes():
    query = """
    {
        users(where: {countReveals_not: null}, orderBy: countReveals, orderDirection: desc) {
            id
            address
            countReveals
            countRetrievals
            votesCommited{
                id
            }
        }
    }
    """
    return to_dataframe('users', query)

def priceRequests(ascending=True, num=None):
    direction = "asc" if ascending else "desc"
    limit = f"(first: {num})" if num else ""
    query = f"""
    {{
        priceRequests{limit}(where: {{resolutionTimestamp_not: null}}, orderBy: resolutionTimestamp, orderDirection: {direction}){{
            id
            isResolved
            price
            latestRound
            time
            identifier
            ancillaryData
            resolutionTransaction
            resolutionTimestamp
            resolutionBlock
            rounds{{
                id
            }}
            committedVotes{{
                id
            }}
            revealedVotes{{
                id
            }}
            rewardsClaimed{{
                id
            }}
        }}
    }}
    """
    return to_dataframe('priceRequests', query)

def firstPriceIdentifiers(num):
    query = f"""
    {{
        priceIdentifiers(first: {num}) {{
            id
            isSupported
            priceRequests {{
                id
            }}
        }}
    }}
    """
    return to_dataframe('priceIdentifiers', query)

def firstUsers(num):
    query = f"""
    {{
        users(first: {num}) {{
            id
            address
            countReveals
            countRetrievals
        }}
    }}
    """
    return to_dataframe('users', query)

def find_user_by_address(address: str) -> pd.DataFrame:
    """Find a user by a specific UMA address."""
    query = f"""
    {{
        users(where: {{id: "{address}"}}, subgraphError: allow) {{
            id
            address
            countReveals
            votesCommited() {{
                id
                time
            }}
            votesRevealed() {{
                id
                numTokens
                price
                time
            }}
        }}   
    }}
    """
    
    return to_dataframe('users', query)


def main():
    df = find_user_by_address("0x000000aaee6a496aaf7b7452518781786313400f")
    print(df)
    return

if __name__ == "__main__":
    main()