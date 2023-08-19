import { useEffect, useState } from 'react'
import Link from 'next/link'

import { BlogPostCard } from 'components/native/BlogPostCard'

import prisma from 'lib/prisma'
import { useRouter } from 'next/navigation'
import { useValidAccessToken } from 'hooks/useAccessToken'
import { isVariableValid } from 'lib/utils'
import { useCMS } from 'hooks/useCMS'

export default function Index() {
    const { Authenticated, AccessToken } = useValidAccessToken()
    const { isAdmin, isVendor, vendor } = useCMS()

    const [user, setUser] = useState(null)
    const router = useRouter()

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

        if (
            isVariableValid(Authenticated) ||
            !Authenticated ||
            !isVariableValid(vendor) ||
            !isVendor
        )
            router.push('/')
        if (
            isVariableValid(AccessToken) &&
            isVariableValid(Authenticated) &&
            Authenticated
        )
            getUser()
    }, [AccessToken, Authenticated, router])

    return (
        <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
            <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
                Recent Blog Posts
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3"></div>
        </div>
    )
}
