import { configureChains, createConfig } from 'wagmi'
import {  arbitrumGoerli} from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = '6c2572e4829f24ce14d0735ec1c5d11e'

const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [arbitrum, ...(import.meta.env?.MODE === 'development' ? [goerli] : [])],
  [arbitrumGoerli],
  [
    publicProvider(),
    // jsonRpcProvider({
    //   rpc: () => ({
    //     http: `https://arbitrum-goerli.publicnode.com`,
    //   }),
    // }),
  ],
)

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //   },
    // }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})
