import { View, Text } from "react-native";

import styles from "./about.style";

import { List, Card, Space } from 'antd';

const { Meta } = Card;
import React from 'react';


const sample_response = {
  "jsonrpc": "2.0",
  "id": 67,
  "result": {
    "owner": "0x0E5d299236647563649526cfa25c39d6848101f5",
    "assets": [
      {
        "collectionName": "Reputable 2022",
        "collectionTokenId": "58",
        "collectionAddress": "0xa4a226a089512f27560aec989c3d1e7c6a2958f4",
        "name": "Carbon-Neutral NFT",
        "description": "This NFT signifies this fund is carbon neutral.",
        "imageUrl": "https://imageio.forbes.com/specials-images/imageserve/1151803694/Environment-concept/960x0.jpg?format=jpg&width=960",
        "chain": "ETH",
        "network": "MAINNET"
      },
      {
        "collectionName": "Reputable 2023",
        "collectionTokenId": "1963555",
        "collectionAddress": "0x06012c8cf97bead5deae237070f9587f8e7a266d",
        "name": "FinTech Fund NFT",
        "description": "This NFT signifies this fund invests in the frontier of FinTech and Blockchain technologies.",
        "imageUrl": "https://builtin.com/sites/www.builtin.com/files/styles/og/public/2022-09/fintech.png",
        "chain": "ETH",
        "network": "MAINNET"
      },
      {
        "collectionName": "Reputable 2023",
        "collectionTokenId": "1",
        "collectionAddress": "0x9d99d15997e16f0b6d2af325db32b7544c4d5e7e",
        "name": "Certified Performance NFT",
        "description": "This NFT signifies this fund has achieved YoY performance above 7%.",
        "imageUrl": "https://cdn.anevis-solutions.com/wp-content/uploads/2016/04/26143030/performance-calculation.png",
        "chain": "ETH",
        "network": "MAINNET"
      }
    ],
    "totalPages": 1,
    "totalItems": 6,
    "pageNumber": 1
  }
}

const NFTList = ({ assets }) => {
  return (
    <List
      grid={{ gutter: 16, column: 3 }} // Adjust the number of columns as needed
      dataSource={assets}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={<img alt={item.name} src={item.imageUrl} />}
            actions={[
              <Space>
                <span>Owner: {item.owner}</span>
                <span>Collection: {item.collectionName}</span>
              </Space>,
            ]}
          >
            <Meta title={item.name} description={item.description} />
          </Card>
        </List.Item>
      )}
    />
  );
};


const About = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the fund:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>Vanguard is a fast-growing company that empowers you to make a difference in an ever-changing industry through advanced platforms and technologies.
</Text>
      </View>

      <Text style={styles.headText}>Fund NFT Details:</Text>
      <p></p>

      <NFTList assets={sample_response.result.assets} />

    </View>
  );
};

export default About;
