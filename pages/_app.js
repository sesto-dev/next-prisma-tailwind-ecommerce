import cookie from 'cookie'
import App from 'next/app'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/core'

import { ThemeContext, themes } from '../state/Theme'
import { AuthProvider } from '../state/Auth'

import config from '../config/main.config'

export default function MyApp({ Component, pageProps, authenticated }) {
    const [themeType, setThemeType] = useState(config.theme.defaultTheme)
    const router = useRouter()
    const isProduction = process.env.NODE_ENV === 'production'
    const googleID = config.analytics.googleAnalyticsID

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
                <AuthProvider authenticated={authenticated}>
                    <Component {...pageProps} />
                </AuthProvider>
            </ThemeContext.Provider>
        </GeistProvider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    let authenticated = false
    const request = appContext.ctx.req

    if (request) {
        request.cookies = cookie.parse(request.headers.cookie || '')
        authenticated = !!request.cookies.AJWT
    }

    const appProps = await App.getInitialProps(appContext)

    return { ...appProps, authenticated }
}
