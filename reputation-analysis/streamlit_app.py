import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import uma_subgraph as uma
import aave_gho_subgraph as aave
import json

# Function to retrieve data for a given wallet address from the blockchain.
# This should be replaced with the actual method of getting the data.
def get_data_for_wallet(wallet_address):
    # For this example, I'll assume a simple dataframe. Replace with real logic.
    df = uma.find_user_by_address(wallet_address)
    return df

def load_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data

# Check if 'page' is already in the session state
if 'page' not in st.session_state:
    st.session_state.page = 'main'

# Page Navigation
st.sidebar.title('Navigation')
st.sidebar.button('Main', on_click=lambda: setattr(st.session_state, 'page', 'main'))
st.sidebar.button('UMA', on_click=lambda: setattr(st.session_state, 'page', 'uma'))
st.sidebar.button('Aave', on_click=lambda: setattr(st.session_state, 'page', 'aave'))
st.sidebar.button('Safe', on_click=lambda: setattr(st.session_state, 'page', 'safe'))
st.sidebar.button('Glossary', on_click=lambda: setattr(st.session_state, 'page', 'glossary'))

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

# UMA Page
elif st.session_state.page == 'uma':
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

        if st.button("Back to Main"):
            st.session_state.page = 'main'

elif st.session_state.page == 'aave':
    st.title("Aave GHO Analysis")
    st.dataframe(aave.tokens())

elif st.session_state.page == 'safe':
    st.title("Safe")
    # Load and display the JSON data
    json_data = load_json('transaction-tracker/output.json')
    st.json(json_data)
    st.write("Upload your own CLI output")
    uploaded_file = st.file_uploader("Choose a JSON file", type="json")
    if uploaded_file is not None:
        json_data = json.load(uploaded_file)
        st.json(json_data)


elif st.session_state.page =='main':    
    # Main page
    st.image("reputable_logo.png", width=200)
    # Welcome Message
    st.title("Welcome to Reputable's Data Dashboard")

    # Mission Statement
    st.header("Our Mission")
    st.write("""
    Reputable's mission is to provide investors and donors with a one-stop shop to:
    - Conduct market research
    - Deploy capital
    - Audit fund management
    """)

    # Optional Introduction or further details
    st.header("About Reputable")
    st.write("""
    Trustworthy and reliable data is crucial, especially in Web3.
    Reputable is dedicated to offering The Graph and Airstack integrations to query data.
    Dive deep into our dashboard to access the comprehensive insightrs you need.
    """)

    # Call to Action (if any specific user actions are desired from the landing page)
    st.header("Get Started")
    st.write("""
    Navigate through the sidebar to explore different sections of our dashboard.
    Whether you're an investor looking for the next big opportunity or a donor aiming to make 
    a difference, Reputable is here to help.
    """)

