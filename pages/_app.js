import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Layout } from 'aryana'

import { AuthProvider } from '../state/Auth'
import { ThemeProvider } from '../state/Theme'
import { MetaContext } from '../state/Meta'

import essentials from '../helpers/getEssentials'

const obj = {
    title: 'Next',
    description: 'Next Page',
    image: 'https://i.imgur.com/NitQE9d.jpg',
}

export default function ({ Component, pageProps }) {
    const router = useRouter()
    const [meta, setMeta] = useState(essentials.config.meta)

    // Google Analytics Route Handling
    useEffect(() => {
        if (
            process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID &&
            process.env.NODE_ENV === 'production'
        ) {
            const handleRouteChange = (url) => {
                window.gtag(
                    'config',
                    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
                    {
                        page_path: url,
                    }
                )
            }
            router.events.on('routeChangeComplete', handleRouteChange)
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange)
            }
        }
    }, [router.events])

    return (
        <ThemeProvider>
            <AuthProvider>
                <MetaContext.Provider value={{ meta, setMeta }}>
                    <Layout essentials={essentials} meta={meta}>
                        <Component {...pageProps} />
                    </Layout>
                </MetaContext.Provider>
            </AuthProvider>
        </ThemeProvider>
    )
}
