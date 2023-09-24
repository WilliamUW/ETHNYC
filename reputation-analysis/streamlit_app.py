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

# Check if 'page' is already in the session state
if 'page' not in st.session_state:
    st.session_state.page = 'main'


if st.session_state.page == 'glossary':
    glossary = { 
        "address": "The unique wallet address.",
        "countRetrievals": "Provides a lower bound on the number of votes a user has correctly voted for. Users may not have retrieved rewards for all of their correct votes.",
        "countReveals": "Number of price requests that this wallet address has revealed a vote for, and therefore participated in as a voter.",
        "votesCommited": "Number of votes committed by the wallet address.",
        "votesRevealed": "Number of votes revealed by the wallet address.."
    }

    # Convert the dictionary to a DataFrame with columns "Field" and "Description"
    df_glossary = pd.DataFrame(glossary.items(), columns=["Field", "Description"])

    st.title("Glossary")  # Set the title for the table
    st.table(df_glossary)

    if st.button("Back to Main"):
        st.session_state.page = 'main'

# Main page
elif st.session_state.page == 'main':
    if st.button("Open Glossary"):
        st.session_state.page = 'glossary'
    else:
        st.title("UMA Disputes Analysis")
        # Input for the blockchain wallet address
        wallet_address = st.text_input("UMA Wallet Address:", "0x000000aaee6a496aaf7b7452518781786313400f")

        if wallet_address:
            # Fetching the data for the entered wallet address
            df = get_data_for_wallet(wallet_address)
            # Displaying the data in a table
            st.dataframe(df)

            # Plotting the data
            fig, ax = plt.subplots()
            
            # Print desired values
            for index, row in df.iterrows():
                print(f"Address: {row['address']}")
                print(f"countReveals: {row['countReveals']}")
                print(f"countRetrievals: {row['countRetrievals']}")
                print(f"votesCommited: {row['votesCommited']}")
                print(f"votesRevealed: {row['votesRevealed']}")
                print("------------------")
            
            print(f"")