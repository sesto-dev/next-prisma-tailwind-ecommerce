import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useAuth } from 'state/Auth'

import { QuestionIcon } from 'components/Icons'

import { MetamaskIcon, WalletConnectIcon } from 'components/Icons'

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'
import Modal from './Modal'

export default function ConnectModal({ modalVisibility, setModalVisibility }) {
    return (
        <Modal
            title="Connect Wallet"
            modalVisibility={modalVisibility}
            setModalVisibility={setModalVisibility}
        >
            <div className="mt-2 px-6">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <Connector />
                </div>
                <div className="my-4">
                    <a
                        href="#"
                        className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                    >
                        <QuestionIcon />
                        Why do I need to connect with my wallet?
                    </a>
                </div>
            </div>
        </Modal>
    )
}

function Connector() {
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ address })
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const router = useRouter()
    const [toast, setToast] = useState(null)

    useEffect(() => {
        if (isConnected && address) onConnect(address)
    }, [isConnected])

    async function onConnect(wallet) {
        const res = await fetch(`/api/auth/wallet`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                wallet,
            }),
        })

        const json = await res.json()
        const { error } = json

        if (error) {
            setToast(error.message)
        } else {
            setLocalAuthentication(true)
            router.replace('/')
            setToast('Successfully logged in.')
        }
    }

    if (isConnected) {
        return (
            <div>
                <img src={ensAvatar} alt="ENS Avatar" />
                <div>{ensName ? `${ensName} (${address})` : address}</div>
                <div>Connected to {connector.name}</div>
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        )
    } else
        return (
            <>
                {connectors.map((connector) => {
                    let icon
                    switch (connector.name) {
                        case 'MetaMask':
                            icon = <MetamaskIcon />
                            break
                        case 'WalletConnect':
                            icon = <WalletConnectIcon />
                            break
                    }
                    return (
                        <button
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                            className="group flex items-center rounded-lg bg-gray-50 p-3 text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                            {!connector.ready && ' (unsupported)'}
                            {isLoading &&
                                connector.id === pendingConnector?.id &&
                                ' (connecting)'}
                            {icon}
                            <span className="mt-0 ml-3 flex-1 whitespace-nowrap text-left font-medium">
                                {error
                                    ? 'Try Again'
                                    : isLoading
                                    ? 'Disconnect'
                                    : connector.name}
                            </span>
                        </button>
                    )
                })}
            </>
        )
}
