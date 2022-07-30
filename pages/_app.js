import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { GeistProvider, CssBaseline } from '@geist-ui/core'

import { ThemeContext, themes } from '../state/Context'
import config from '../main.config'

export default function App({ Component, pageProps }) {
    const [themeType, setThemeType] = useState(config.theme.defaultTheme)
    const router = useRouter()
    const isProduction = process.env.NODE_ENV === 'production'
    const googleID = config.analytics.googleAnalyticsID

    useEffect(() => {
        if (googleID && isProduction) {
            const handleRouteChange = (url) => {
                window.gtag('config', googleID, {
                    page_path: url,
                })
            }
            router.events.on('routeChangeComplete', handleRouteChange)
            return () => {
                router.events.off('routeChangeComplete', handleRouteChange)
            }
        }
    }, [router.events])

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            document.documentElement.removeAttribute('style')
            document.body.removeAttribute('style')

            const theme = window.localStorage.getItem('theme')
            if (themes.includes(theme)) setThemeType(theme)
        }
    }, [])

    const switchTheme = useCallback((theme) => {
        setThemeType(theme)
        if (typeof window !== 'undefined' && window.localStorage)
            window.localStorage.setItem('theme', theme)
    }, [])

    return (
        <GeistProvider themeType={themeType}>
            <CssBaseline />
            <ThemeContext.Provider value={{ themeType, switchTheme }}>
                <Component {...pageProps} />
            </ThemeContext.Provider>
        </GeistProvider>
    )
}
