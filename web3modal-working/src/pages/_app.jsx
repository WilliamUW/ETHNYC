import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import "../styles.css";

import { List, InputNumber, Select, Button } from 'antd'

import Head from 'next/head';
import {PrivyProvider} from '@privy-io/react-auth';


import { MetaMaskSDK } from '@metamask/sdk';

// const options = {dappMetadata: {name: "My Dapp", url: "https://mydapp.com"}}

// const MMSDK = new MetaMaskSDK(options);

// const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum

// ethereum.request({ method: 'eth_requestAccounts', params: [] });




// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// 2. Configure wagmi client
const chains = [mainnet, polygon, optimism];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const [value, setValue] = useState('10');
  const [currency, setCurrency] = useState('USDC');


  const { Option } = Select;

  const selectAfter = (
    <Select defaultValue="USDC" style={{ width: 100 }} onChange={setCurrency}>
      <Option value="USDC">USDC</Option>
      <Option value="ETH">ETH</Option>
      <Option value="BTC">BTC</Option>
      <Option value="MATIC">MATIC</Option>
      <Option value="SHIB">SHIB</Option>
    </Select>
  );

  // This method will be passed to the PrivyProvider as a callback
  // that runs after successful login.
  const handleLogin = (user) => {
    console.log(`User ${user.id} logged in!`)
  }


  return (
    <>
      <List
        header={<div>Connect with your preferred funding method!</div>}
        footer={<div>Reach out to our AI assistant if you have any questions!</div>}
        bordered>

        <List.Item>
          {ready ? (
            <WagmiConfig config={wagmiConfig}>
              <Component {...pageProps} />
            </WagmiConfig>
          ) : null}

          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </List.Item>
        {/* <List.Item>
          <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
            onSuccess={handleLogin}
            config={{
              loginMethods: ['email', 'wallet'],
              appearance: {
                theme: 'light',
                accentColor: '#676FFF',
                logo: 'https://your-logo-url',
              },
            }}
          >
            <Component {...pageProps} />
          </PrivyProvider>
        </List.Item> */}
        <List.Item>
          <p>How much would you like to fund?</p>
        </List.Item>
        <List.Item>
          <InputNumber min={0} addonAfter={selectAfter} defaultValue={10} onChange={setValue} />
        </List.Item>

        <List.Item>
          <Button type="primary" onClick={() => alert("Investing " + value + " " + currency + " into the fund!")}>Confirm Transaction</Button>
        </List.Item>
      </List>
    </>
  );
}
