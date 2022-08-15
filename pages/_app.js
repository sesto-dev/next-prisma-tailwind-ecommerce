import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { AuthProvider } from '../state/Auth'
import { ThemeProvider } from '../state/Theme'

export default function ({ Component, pageProps }) {
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
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    )
}
