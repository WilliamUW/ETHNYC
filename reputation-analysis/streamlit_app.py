import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import uma_subgraph as uma

# Function to retrieve data for a given wallet address from the blockchain.
# This should be replaced with the actual method of getting the data.
def get_data_for_wallet(wallet_address):
    # For this example, I'll assume a simple dataframe. Replace with real logic.
    df = uma.find_user_by_address(wallet_address)
    return df

st.title("UMA Disputes Analysis")

glossary = { 
    "address": "The unique wallet address.",
    "countRetrievals": "Provides a lower bound on the number of votes a user has correctly voted for. Users may not have retrieved rewards for all of their correct votes.",
    "countReveals": "Number of price requests that this wallet address has revealed a vote for, and therefore participated in as a voter.",
    "votesCommited": "Number of votes committed by the wallet address.",
    "votesRevealed": "Number of votes revealed by the wallet address.."
}

st.sidebar.title("Glossary")

for term, definition in glossary.items():
    st.sidebar.write(f"**{term}**: {definition}")

#glossary_list = [[key, value] for key, value in glossary.items()]

# Input for the blockchain wallet address
wallet_address = st.text_input("UMA Wallet Address:", "0x000000aaee6a496aaf7b7452518781786313400f")

if wallet_address:
    # Fetching the data for the entered wallet address
    df = get_data_for_wallet(wallet_address)
    st.write(df.columns)
    # Displaying the data in a table
    st.dataframe(df)

    # Plotting the data
    fig, ax = plt.subplots()
    
    #df.set_index('Wallet Address')[['count_reveals', 'countRetrievals', 'votesCommited']].plot(kind='bar', ax=ax, figsize=(10, 5))
    df.set_index('address')[['countReveals', 'countRetrievals', 'votesCommited']].plot(kind='bar', ax=ax, figsize=(10, 5))
    ax.set_title("Activity Overview for Wallet Address")
    ax.set_ylabel("Counts")
    ax.set_xlabel("Wallet Address")
    
    st.pyplot(fig)

st.write("""
Note: Make sure to replace the `get_data_for_wallet` function with the actual method 
      to retrieve data from your blockchain. This is just a template with sample data.
""")

if __name__ == "__main__":
    st.run()
