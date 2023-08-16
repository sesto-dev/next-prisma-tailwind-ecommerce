import { useEffect, useState } from 'react'

import Meta from 'components/native/Meta'
import Config from 'config/site'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from 'hooks/useAccessToken'
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'components/ui/accordion'
import { Spinner } from 'components/native/icons'
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
        async function getUser() {
            try {
                const answer = await fetch(`/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const {
                    cart: { items },
                } = await answer.json()

                setVariants(items)
            } catch (error) {}
        }

        if (isVariableValid(AccessToken)) getUser()
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
