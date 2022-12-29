import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

import config from 'main.config'

export default function Subscription() {
    const [loading, setLoading] = useState(false)

    async function onSubscribe() {
        setLoading(true)
    }

    return <></>
}
