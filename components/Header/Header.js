import { useState, useEffect } from 'react'
import { useTheme } from '@geist-ui/core'

import { useIsAuthenticated } from '../../state/Auth'

import Submenu from './Submenu'
import ThemeButton from './ThemeButton'
import Title from './Title'
import Login from './Login'
import Account from './Account'

export default function ({ config, themePreference }) {
    const isAuthenticated = useIsAuthenticated()

    const theme = useTheme()
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        const scrollHandler = () =>
            setSticky(document.documentElement.scrollTop > 54)
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [setSticky])

    return (
        <>
            <nav className="Navigation">
                <Title config={config} />
                <div>
                    {themePreference && (
                        <ThemeButton
                            config={config}
                            sticky={sticky}
                            themePreference={themePreference}
                        />
                    )}
                    {isAuthenticated ? (
                        <Account config={config} sticky={sticky} />
                    ) : (
                        <Login config={config} sticky={sticky} />
                    )}
                </div>
            </nav>
            <Submenu config={config} sticky={sticky} />
            <style jsx global>
                {`
                    .Navigation {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        background-color: ${theme.palette.background};
                        font-size: 16px;
                        height: 54px;
                        box-sizing: border-box;
                    }
                    .Navigation > div {
                        display: flex;
                        align-items: center;
                    }
                `}
            </style>
        </>
    )
}
