import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { GeistProvider, CssBaseline } from '@geist-ui/core'

import { UserContext, ThemeContext, themes } from '../state/Context'
import config from '../main.config'

export default function App({ Component, pageProps }) {
    const [user, setUser] = useState(null)
    const [themeType, setThemeType] = useState(config.theme.defaultTheme)
    const router = useRouter()
    const isProduction = process.env.NODE_ENV === 'production'
    const googleID = config.analytics.googleAnalyticsID

    const serial = Math.random().toString(36).slice(2)
    console.log(serial)

    // Authentication
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const ls = JSON.parse(window.localStorage.getItem('user'))

            if (ls) {
                setUser(ls)
            }
        }
    }, [])

    // Google Analytics Route Handling
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

    // Theming
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
                <UserContext.Provider value={{ user, setUser }}>
                    <Component {...pageProps} />
                </UserContext.Provider>
            </ThemeContext.Provider>
        </GeistProvider>
    )
}
