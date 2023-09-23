import React, { useState } from 'react';
import './App.css';

// Sample fund data (you should replace this with your actual data)
const fundData = [
  {
    id: 1,
    name: 'Fund A',
    image_url: 'https://loremflickr.com/240/240?random=1',
    reputation_score: 85,
    description: 'Fund A is a diversified investment fund...',
    performance: '10% annual return (YTD)',
    management_fee: '1.5%',
    transactions: ['Transaction 1', 'Transaction 2', 'Transaction 3'],
    disputes: [
      { dispute_id: 1, description: 'Dispute 1', successful: true },
      { dispute_id: 2, description: 'Dispute 2', successful: false },
    ],
  },
  {
    id: 2,
    name: 'Fund B',
    image_url: 'https://loremflickr.com/240/240?random=2',
    reputation_score: 92,
    description: 'Fund B is a high-risk, high-reward fund...',
    performance: '15% annual return (YTD)',
    management_fee: '2.0%',
    transactions: ['Transaction 4', 'Transaction 5', 'Transaction 6'],
    disputes: [],
  },
  // Add more fund data here
];

function App() {
  const [selectedFund, setSelectedFund] = useState(null);

  const openFundModal = (fund) => {
    setSelectedFund(fund);
  };

  const closeFundModal = () => {
    setSelectedFund(null);
  };

  return (
    <div className="App">
      <h1>Fund List</h1>
      {fundData.map((fund) => (
        <div key={fund.id} className="fund-panel">
          <img src={fund.image_url} alt={fund.name} className="fund-image" />
          <div className="fund-details">
            <h2>{fund.name}</h2>
            <p>Reputation Score: {fund.reputation_score}/100</p>
            <button onClick={() => openFundModal(fund)}>Open</button>
          </div>
        </div>
      ))}
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
            <ul>
              {selectedFund.transactions.map((transaction, index) => (
                <li key={index}>{transaction}</li>
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
