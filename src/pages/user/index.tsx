import { useEffect, useState } from 'react'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from 'src/hooks/useAccessToken'
import { isVariableValid } from 'lib/utils'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'components/ui/table'

export default function User({}) {
    const { AccessToken } = useValidAccessToken()
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUser() {
            const answer = await fetch(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const { user: returnedUser } = await answer.json()
            setUser(returnedUser)
        }

        getUser()
    }, [AccessToken])

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            {isVariableValid(user) && (
                <div className="rounded-lg bg-neutral-100 dark:bg-neutral-900">
                    <UserInfo user={user} />
                    <Payments user={user} />
                </div>
            )}
        </>
    )
}

function UserInfo({ user }) {
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
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="border border-neutral-200 p-5 font-light dark:border-neutral-700 "></div>
            </div>
        </div>
    )
}

function Payments({ user }) {
    const [visibility, setVisibility] = useState(false)

    return (
        <div>
            <button
                type="button"
                className="flex w-full items-center justify-between border border-neutral-200 p-5 text-left text-xl text-black transition-all ease-in-out hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                onClick={() => setVisibility(!visibility)}
            >
                <span className="flex flex-col">
                    <h1>Payments</h1>
                    <small className="text-neutral-300">
                        Your order history.
                    </small>
                </span>
                {visibility ? (
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className="border border-neutral-200 p-8 font-light dark:border-neutral-700">
                    {isVariableValid(user.payments) && (
                        <Table>
                            <TableCaption>
                                A list of your recent invoices.
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        Invoice
                                    </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        INV001
                                    </TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">
                                        $250.00
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
                    <ChevronUpIcon className="h-5 w-5" />
                ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                )}
            </button>
            <div className={!visibility && 'hidden'}>
                <div className=" border border-neutral-200 p-5 font-light dark:border-neutral-700"></div>
            </div>
        </div>
    )
}
