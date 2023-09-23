# API KEY: 724d184d634546579c78f4092c2fd30e

import asyncio
from airstack.execute_query import AirstackClient

api_client = AirstackClient(api_key="724d184d634546579c78f4092c2fd30e")
transactionObjs = [] 

query = """query GetTransactionsByAddress {
  ethereumTransfers: TokenTransfers(
    input: {
      filter: {
        _or: [
          {from: {_eq: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"}},
          {to: {_eq: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"}}
        ]
      },
      blockchain: ethereum,
      limit: 50
    }
  ) {
    TokenTransfer {
      amount
      blockNumber
      blockTimestamp
      from {
        addresses
      }
      to {
        addresses
      }
      tokenAddress
      transactionHash
      tokenType
      blockchain
    }
  }
}
"""

async def main():
    execute_query_client = api_client.create_execute_query_object(
        query=query)
    query_response = await execute_query_client.execute_query()
    vals = query_response.data
    transactions = vals['ethereumTransfers']['TokenTransfer']
    
    print(transactions)
        
    #print(query_response.data)

asyncio.run(main())