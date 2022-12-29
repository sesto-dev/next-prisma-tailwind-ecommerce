import { createClient, defaultChains, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_KEY }),
    publicProvider(),
])

export const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),

        new WalletConnectConnector({
            chains,
            options: {
                qrcode: true,
            },
        }),
    ],
    provider,
    webSocketProvider,
})
