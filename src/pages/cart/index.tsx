import { useEffect, useState } from 'react'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import { useValidAccessToken } from 'hooks/useAccessToken'

import { CartGrid } from 'components/native/Cart'
import type { CartItemWithVendorVariant } from 'types/prisma'
import { getLocalCart, writeLocalCart } from 'lib/cart'
import { validateBoolean } from 'lib/utils'

export default function Cart() {
    const { Authenticated, AccessToken } = useValidAccessToken()
    const [items, setItems] = useState<CartItemWithVendorVariant[] | null>(null)

    useEffect(() => {
        async function getCart() {
            try {
                const answer = await fetch(`/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const json = await answer.json()
                setItems(json?.cart?.items)
                writeLocalCart(json?.cart?.items)
            } catch (error) {
                console.error({ error })
            }
        }

        if (validateBoolean(Authenticated, true)) getCart()
        if (validateBoolean(Authenticated, false)) setItems(getLocalCart())
    }, [AccessToken, Authenticated])

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <h3 className="mb-1 text-xl font-bold tracking-tight md:text-4xl">
                Cart
            </h3>
            <p className="mb-4 text-xs text-neutral-500 text-justify">
                Below is a list of products you have in your cart.
            </p>
            <CartGrid />
        </>
    )
}
