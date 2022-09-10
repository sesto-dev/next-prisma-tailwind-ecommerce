import { useEffect } from 'react'
import { Layout } from 'aryana'

import { AuthProvider } from '../state/Auth'
import { ThemeProvider } from '../state/Theme'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useThemeProvider } from '../state/Theme'
import { useAuth } from '../state/Auth'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function ({ Component, pageProps }) {
    const essentials = {
        config,
        i18n,
        Link,
        Head,
        axios,
        useThemeProvider,
        useAuth,
        useRouter,
    }

    const router = useRouter()

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
                <Layout essentials={essentials}>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </ThemeProvider>
    )
}
