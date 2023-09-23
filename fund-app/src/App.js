import React, { useState } from 'react';
import './App.css';
import { Web3Button } from '@web3modal/react'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = 'cd2c1ad034a54bf3f4d330d1695db065'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


// Sample fund data (you should replace this with your actual data)
const fundData = [
  {
    id: 1,
    name: 'Fund A',
    image_url: 'fund_a_image.jpg',
    reputation_score: 85,
    description: 'Fund A is a diversified investment fund...',
    performance: '10% annual return (YTD)',
    management_fee: '1.5%',
    transactions: [
      {
        id: 1,
        currency_image_url: 'ETH.png',
        date: '2023-09-22',
        label: 'Received ETH',
        change_in_balance: '+500 ETH',
      },
      {
        id: 2,
        currency_image_url: 'btc.PNG',
        date: '2023-09-21',
        label: 'Purchase Bitcoin',
        change_in_balance: '-0.05 BTC',
      },
      // Add more transaction data here
    ],
    disputes: [
      { dispute_id: 1, description: 'Dispute 1', successful: true },
      { dispute_id: 2, description: 'Dispute 2', successful: false },
    ],
  },
  {
    id: 2,
    name: 'Fund B',
    image_url: 'fund_b_image.jpg',
    reputation_score: 92,
    description: 'Fund B is a high-risk, high-reward fund...',
    performance: '15% annual return (YTD)',
    management_fee: '2.0%',
    transactions: [],
    disputes: [],
  },
  // Add more fund data here
];


  function App() {
    const [selectedFund, setSelectedFund] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [minReputation, setMinReputation] = useState(0);
    const [maxReputation, setMaxReputation] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const fundsPerPage = 5; // Number of funds to display per page
  
    const openFundModal = (fund) => {
      setSelectedFund(fund);
    };
  
    const closeFundModal = () => {
      setSelectedFund(null);
    };
  
    const filteredFunds = fundData.filter(
      (fund) =>
        fund.name.toLowerCase().includes(searchText.toLowerCase()) &&
        fund.reputation_score >= minReputation &&
        fund.reputation_score <= maxReputation
    );
  
    const totalFunds = filteredFunds.length;
    const totalPages = Math.ceil(totalFunds / fundsPerPage);
  
    const getPageFunds = () => {
      const startIndex = (currentPage - 1) * fundsPerPage;
      const endIndex = startIndex + fundsPerPage;
      return filteredFunds.slice(startIndex, endIndex);
    };

    const handleDisputeButtonClick = (transaction) => {
      // Display an alert with transaction details
      alert(
        `Would you like to dispute the following transaction? \n\n Transaction Details:\nDate: ${transaction.date}\nLabel: ${transaction.label}\nChange in Balance: ${transaction.change_in_balance}`
      );
    };
  
    return (
      <div className="App">


        <h1>Fund List</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="reputation-filter">
            <label>Reputation Range:</label>
            <input
              type="number"
              placeholder="Min"
              value={minReputation}
              onChange={(e) => setMinReputation(parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxReputation}
              onChange={(e) => setMaxReputation(parseInt(e.target.value))}
            />
          </div>
        </div>
        {getPageFunds().map((fund) => (
          <div key={fund.id} className="fund-panel">
          <img src={fund.image_url} alt={fund.name} className="fund-image" />
          <div className="fund-details">
            <div className="fund-header">
              <h2>{fund.name}</h2>
              <p>Reputation Score: {fund.reputation_score}/100</p>
            </div>
          </div>
          <button onClick={() => openFundModal(fund)}>Open</button>
        </div>
        ))}
        {totalFunds === 0 && <p>No funds match the criteria.</p>}
        {totalFunds > fundsPerPage && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
        {selectedFund && (
          <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeFundModal}>
              Close
            </button>
            <h2>{selectedFund.name}</h2>
            <p>Description: {selectedFund.description}</p>
            <p>Performance: {selectedFund.performance}</p>
            <p>Management Fee: {selectedFund.management_fee}</p>
            <h3>Transactions</h3>
            <ul className="transaction-list">
              {selectedFund.transactions.map((transaction) => (
                <li key={transaction.id} className="fund-panel">
                  <img
                    src={transaction.currency_image_url}
                    alt="Currency"
                    className="currency-image"
                    height="100"
                    width="100"
                  />
                  <div className="transaction-details">
                    <p>Date: {transaction.date}</p>
                    <p>Label: {transaction.label}</p>
                    <p>Change in Balance: {transaction.change_in_balance}</p>
                  </div>
                  <button className="dispute-button"
                    onClick={() => handleDisputeButtonClick(transaction)}
                  >Dispute</button>
                </li>
              ))}
            </ul>
            <h3>Disputes</h3>
            <ul>
              {selectedFund.disputes.map((dispute) => (
                <li key={dispute.dispute_id}>
                  {dispute.description} (Successful: {dispute.successful ? 'Yes' : 'No'})
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
      </div>
    );
  }
  
  export default App;

