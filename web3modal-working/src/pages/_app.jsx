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

import { List } from 'antd'

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

  return (
    <>
        <List
          header={<div>Connect with your preferred funding method!</div>}
          footer={<div>Reach out to our AI assistant</div>}
          bordered>

      <List.Item>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </List.Item>
    </List>
    </>
  );
}
