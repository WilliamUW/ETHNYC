import streamlit as st

# Sample fund data (you should replace this with your actual data)
fund_data = [
    {
        "name": "Fund A",
        "image_url": "https://loremflickr.com/320/240?random=1",
        "reputation_score": 85,
        "description": "Fund A is a diversified investment fund...",
        "performance": "10% annual return (YTD)",
        "management_fee": "1.5%",
        "transactions": ["Transaction 1", "Transaction 2", "Transaction 3"],
        "disputes": [
            {"dispute_id": 1, "description": "Dispute 1", "successful": True},
            {"dispute_id": 2, "description": "Dispute 2", "successful": False},
        ],
    },
    {
        "name": "Fund B",
        "image_url": "https://loremflickr.com/320/240?random=2",
        "reputation_score": 92,
        "description": "Fund B is a high-risk, high-reward fund...",
        "performance": "15% annual return (YTD)",
        "management_fee": "2.0%",
        "transactions": ["Transaction 4", "Transaction 5", "Transaction 6"],
        "disputes": [],
    },
    # Add more fund data here
]

# Define the Streamlit app
def main():
    st.title("Fund List")

    # Iterate through fund data and display panels
    for idx, fund in enumerate(fund_data):
        st.markdown("---")  # Add a horizontal line to separate panels
        col1, col2, col3, col4 = st.columns([1, 1, 1, 5])  # Create columns for layout
        with col1:
            st.image(fund["image_url"], caption="", use_column_width=True)
        with col2:
            st.subheader(fund["name"])
        with col3:
            st.write(f"Reputation Score: {fund['reputation_score']}/100")
        with col4:
            if st.button("Open", key=idx):
                display_fund_details(fund)

def display_fund_details(fund):
    st.write(f"**Name:** {fund['name']}")
    st.write(f"**Description:** {fund['description']}")
    st.write(f"**Performance:** {fund['performance']}")
    st.write(f"**Management Fee:** {fund['management_fee']}")
    
    # You can add a graph here to display performance history
    
    st.write("### Transactions")
    st.write(fund['transactions'])
    
    st.write("### Disputes")
    for dispute in fund['disputes']:
        st.write(f"**Dispute ID:** {dispute['dispute_id']}")
        st.write(f"**Description:** {dispute['description']}")
        st.write(f"**Successful:** {'Yes' if dispute['successful'] else 'No'}")

if __name__ == "__main__":
    main()
