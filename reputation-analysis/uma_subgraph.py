import pandas as pd
import json
import numpy as np
import subgraphs

# The UMA subgraph indexes data from UMA contracts over time. It organizes data
# about tokenholders, contracts, DVM requests, voting, and more. The subgraph
# updates for each UMA contract interaction. 

# https://thegraph.com/explorer/subgraph?id=41LCrgtCNBQyDiVVyZEuPxbvkBH9BxxLU3nEZst77V8o&view=Overview

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
    return subgraphs.to_dataframe('UMA', 'voterGroups', query)

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
    return subgraphs.to_dataframe('UMA', 'users', query)

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
    return subgraphs.to_dataframe('UMA', 'users', query)

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
    return subgraphs.to_dataframe('UMA', 'priceRequests', query)

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
    return subgraphs.to_dataframe('UMA', 'priceIdentifiers', query)

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
    return subgraphs.to_dataframe('UMA', 'users', query)

def find_user_by_address(address: str) -> pd.DataFrame:
    """Find a user by a specific UMA address."""
    query = f"""
    {{
        users(where: {{id: "{address}"}}, subgraphError: allow) {{
            countRetrievals
            countReveals
            id
            votesCommited(first: 10) {{
                id
            }}
            votesRevealed(first: 10) {{
                price
                numTokens
                voter {{
                    address
                    countRetrievals
                    countReveals
                    id
                    votesCommited
                    votesRevealed
                }}
            }}
            address
        }}   
    }}
    """
    return subgraphs.to_dataframe("UMA", 'users', query)



def main():
    df = find_user_by_address("0x000000aaee6a496aaf7b7452518781786313400f")
    print(df)
    return

if __name__ == "__main__":
    main()