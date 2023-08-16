import { useEffect, useState } from 'react'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from 'hooks/useAccessToken'
import { isVariableValid } from 'lib/utils'
import { useRouter } from 'next/navigation'
import { CartGrid } from 'components/native/Cart'

export default function User({}) {
    const { Authenticated, AccessToken } = useValidAccessToken()
    const [variants, setVariants] = useState(null)
    const router = useRouter()

    // useEffect(() => {
    //     if (!Authenticated) router.push('/')
    // }, [])

    useEffect(() => {
        async function getWishlist() {
            try {
                console.log('Calling Wishlist API')

                const answer = await fetch(`/api/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const {
                    wishlist: { items },
                } = await answer.json()

                setVariants(items)
            } catch (error) {
                console.error({ error })
            }
        }

        if (isVariableValid(AccessToken)) getWishlist()
    }, [AccessToken])

    return (
        <>
            <Meta
                title="Pasargad"
                description="Home Page"
                image={Config.ogImage}
                canonical={process.env.NEXT_PUBLIC_URL}
            />
            <CartGrid variants={variants} />
        </>
    )
}
