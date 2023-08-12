import { useEffect, useState } from 'react'

import prisma from 'lib/prisma'
import { useRouter } from 'next/router'
import { useAuth } from 'state/Auth'
import { omitUser } from 'lib/omit'
import { DiscordIcon } from 'components/icons'
import OrderTable from 'components/tables/OrderTable'
import { getDiscordURL } from 'lib/discord'
import Meta from 'components/Meta'
import Config from 'config/site'
import { ChevronDown, ChevronUp, DollarSign } from 'react-feather'

export default function User({ auth, omitted }) {
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [userObject, setUserObject] = useState(null)

    useEffect(() => {
        setLocalAuthentication(auth)
        setUserObject(JSON.parse(omitted))
    }, [])

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            {userObject && (
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900">
                    <UserInfo userObject={userObject} />
                    <Charges userObject={userObject} />
                    <Referrals userObject={userObject} />
                    <Integrations userObject={userObject} />
                </div>
            )}
            <Logout />
        </>
    )
}

function UserInfo({ userObject }) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-t-lg border border-neutral-200 p-5 text-left text-xl text-black hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>User Info</h1>
                    <small className="text-neutral-300">
                        Your personal information.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="border border-neutral-200 p-5 font-light dark:border-neutral-700 "></div>
            </div>
        </div>
    )
}

function Charges({ userObject }) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Charges</h1>
                    <small className="text-neutral-300">
                        Your order history.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="border border-neutral-200 p-8 font-light dark:border-neutral-700">
                    {userObject && userObject['charges'] && (
                        <OrderTable charges={userObject.charges} />
                    )}
                </div>
            </div>
        </div>
    )
}

function Referrals({ userObject }) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Referrals</h1>
                    <small className="text-neutral-300">
                        Your referral history.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className=" border border-neutral-200 p-5 font-light dark:border-neutral-700"></div>
            </div>
        </div>
    )
}

function Integrations({ userObject }) {
    const [visibility, setVisibility] = useState(false)
    const [connectModalVisibility, setConnectModalVisibility] = useState(false)
    const { wallet } = userObject

    function DiscordIntegration() {
        if (userObject.discordId)
            return (
                <p className={getDisabledButtonStyles()}>
                    <DiscordIcon />
                    <span className="ml-3 flex-1 whitespace-nowrap font-medium">
                        Discord Integrated
                    </span>
                    <span className="ml-3 inline-flex items-center justify-center whitespace-nowrap rounded bg-neutral-200 px-2 py-1 text-xs font-medium text-purple-600 dark:bg-neutral-700 ">
                        Integrated with Discord
                    </span>
                </p>
            )

        if (!userObject.discordId)
            return (
                <a
                    href={getDiscordURL({ id: userObject['id'] })}
                    className={getActiveButtonStyles()}
                >
                    <DiscordIcon />
                    <span className="ml-4 flex-1 whitespace-nowrap font-medium">
                        Integrate your Discord Account
                    </span>
                </a>
            )
    }

    function WalletIntegration() {
        if (wallet)
            return (
                <button
                    onClick={() => setConnectModalVisibility(true)}
                    className={getDisabledButtonStyles()}
                >
                    <DollarSign className="h-6 w-5" />
                    <span className=" ml-3 flex-1 whitespace-nowrap text-left font-medium">
                        Web3 Wallet Integrated
                    </span>
                </button>
            )

        if (!wallet)
            return (
                <button
                    onClick={() => setConnectModalVisibility(true)}
                    className={getActiveButtonStyles()}
                >
                    <DollarSign className="h-6 w-5" />
                    <span className="ml-3 flex-1 whitespace-nowrap text-left font-medium">
                        Integrate your Web3 Wallet
                    </span>
                </button>
            )
    }

    return (
        <>
            <button
                type="button"
                className={`flex w-full items-center justify-between ${
                    !visibility && 'rounded-b-lg'
                } border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700`}
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Integrations</h1>
                    <small className="text-neutral-300">
                        Your integrations with third-party services.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="rounded-b-lg border border-neutral-200 p-5 font-light dark:border-neutral-700">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <DiscordIntegration />
                        <WalletIntegration />
                    </div>
                </div>
            </div>
        </>
    )
}

function Logout() {
    const { isAuthenticated, setLocalAuthentication } = useAuth()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function onLogout() {
        setLoading(true)
        const { status } = await fetch('/api/auth/logout')
        setLoading(false)

        if (status == 200) {
            setLocalAuthentication(false)
            router.replace('/')
        }
    }

    return (
        <button
            className="mt-6 w-min rounded-lg border border-neutral-200 bg-neutral-100 px-10 py-2 text-lg text-neutral-400 transition-all duration-300 hover:bg-red-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 hover:dark:bg-red-600"
            onClick={onLogout}
        >
            <p>Logout</p>
        </button>
    )
}

function getActiveButtonStyles() {
    return 'group flex items-center rounded-md bg-purple-700 py-3 px-6 text-neutral-100 transition duration-300 hover:bg-black'
}

function getDisabledButtonStyles() {
    return 'no-scrollbar group flex items-center overflow-x-auto rounded-md border-2 border-solid border-neutral-300/50 bg-transparent py-3 px-6 text-neutral-300/50 dark:border-neutral-500 dark:text-neutral-500'
}
