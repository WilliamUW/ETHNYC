import streamlit as st

# Sample fund data (you should replace this with your actual data)
fund_data = [
    {"name": "Fund A", "image_url": "https://picsum.photos/1.jpg", "reputation_score": 85},
    {"name": "Fund B", "image_url": "https://picsum.photos/2.jpg", "reputation_score": 92},
    {"name": "Fund C", "image_url": "https://picsum.photos/3.jpg", "reputation_score": 78},
        {"name": "Fund D", "image_url": "https://picsum.photos/3.jpg", "reputation_score": 78},

    {"name": "Fund E", "image_url": "https://picsum.photos/3.jpg", "reputation_score": 78},

]

# Define the Streamlit app
def main():
    st.title("Fund List")

    # Iterate through fund data and display panels
    for idx, fund in enumerate(fund_data):
        st.markdown("---")  # Add a horizontal line to separate panels
        col1, col2, col3, col4 = st.columns([1, 3, 2, 1])  # Create columns for layout
        with col1:
            st.image(fund["image_url"], caption="", use_column_width=True)
        with col2:
            st.subheader(fund["name"])
        with col3:
            st.write(f"Reputation Score: {fund['reputation_score']}/100")
        with col4:
            if st.button("Open", key=idx):
                st.write(f"Opening {fund['name']}...")

if __name__ == "__main__":
    main()
