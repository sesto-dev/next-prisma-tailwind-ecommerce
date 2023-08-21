import { useEffect, useState } from 'react'
import Link from 'next/link'

import { BlogPostCard } from 'components/native/BlogPostCard'

import prisma from 'lib/prisma'
import { useRouter } from 'next/navigation'
import { useValidAccessToken } from 'hooks/useAccessToken'
import { isVariableValid, validateBoolean } from 'lib/utils'
import { useCMS } from 'hooks/useCMS'
import Meta from 'components/native/Meta'
import Config from 'config/site'
import { Card, CardContent } from 'components/ui/card'

export default function Index() {
    const { Authenticated, AccessToken } = useValidAccessToken()
    const { isAdmin, isVendor, vendor } = useCMS()

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (
            validateBoolean(Authenticated, false) ||
            validateBoolean(isVendor, false)
        )
            router.push('/')
    }, [Authenticated, router, isVendor])

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`/api/user`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()
            setUser(json?.user)
        }

        if (validateBoolean(Authenticated, true)) getUser()
    }, [AccessToken, Authenticated])

    const links = [
        {
            title: 'Orders',
            description: 'Here you can manage your orders.',
            href: '/cms/orders',
        },
        {
            title: 'Products',
            description: 'Here you can manage your products.',
            href: '/cms/products',
        },
        {
            title: 'Blog',
            description: 'Here you can manage your links.',
            href: '/cms/blog',
        },
    ]

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
            />
            <div className="space-y-2">
                {links.map(({ href, description, title }) => (
                    <Card key={title} className="h-full">
                        <CardContent className="p-4 ">
                            <h5 className="font-bold">{title}</h5>
                            <p className="text-sm">{description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}
