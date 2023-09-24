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

            # Display the main user details (assuming df has only one row because it's specific to an address)
            user_info = df.iloc[0]

            st.write(f"**Address**: {user_info['address']}")
            st.write(f"**Count of Retrievals**: {user_info['countRetrievals']}")
            st.write(f"**Count of Reveals**: {user_info['countReveals']}")

            votes_committed = user_info['votesCommited']
            if votes_committed:
                st.write("### Votes Committed")
                for vote in votes_committed:
                    if 'id' in vote:
                        st.write(vote['id'])
                    else:
                        st.write("ID not found for this vote.")
            else:
                st.write("No votes committed.")


            votes_revealed = user_info['votesRevealed']
            if votes_revealed:
                st.write("### Votes Revealed")
                for vote in votes_revealed:
                    if 'id' in vote:
                        st.write(f"**ID**: {vote['id']}")
                    else:
                        st.write("ID not found for this vote.")

                    # Assuming 'price' and 'numTokens' keys always exist. 
                    # If not, you'd handle them similarly as we did for 'id'
                    st.write(f"**Price**: {vote['price']}")
                    st.write(f"**Num Tokens**: {vote['numTokens']}")
                    # Similarly, you can display details about the voter within each vote, if necessary.
            else:
                st.write("No votes revealed.")

            
            # # Print desired values
            # for index, row in df.iterrows():
            #     print(f"Address: {row['address']}")
            #     print(f"countReveals: {row['countReveals']}")
            #     print(f"countRetrievals: {row['countRetrievals']}")
            #     print(f"votesCommited: {row['votesCommited']}")
            #     print(f"votesRevealed: {row['votesRevealed']}")
            #     print("------------------")
            
            # print(f"")