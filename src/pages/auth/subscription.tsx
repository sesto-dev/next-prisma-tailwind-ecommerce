import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Subscription() {
    const [loading, setLoading] = useState(false)

    async function onSubscribe() {
        setLoading(true)
    }

    return <></>
}
