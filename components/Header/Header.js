import { useState, useEffect } from 'react'
import { useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { useIsAuthenticated } from '../../state/Auth'

import Submenu from './Submenu'
import ThemeButton from './ThemeButton'
import Title from './Title'
import Language from './Language'
import Login from './Login'
import Account from './Account'

import isLocaleRTL from '../../helpers/isLocaleRTL'

export default function ({ config, i18n, themePreference }) {
    const theme = useTheme()
    const { locale, locales } = useRouter()
    const isAuthenticated = useIsAuthenticated()

    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        const scrollHandler = () =>
            setSticky(document.documentElement.scrollTop > 54)
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [setSticky])

    return (
        <>
            {config && i18n && (
                <>
                    <nav className="Navigation">
                        {isLocaleRTL(locale) ? (
                            <>
                                <div>
                                    {themePreference && (
                                        <ThemeButton
                                            config={config}
                                            i18n={i18n}
                                            sticky={sticky}
                                            themePreference={themePreference}
                                        />
                                    )}
                                    {locale && locales && (
                                        <Language
                                            config={config}
                                            i18n={i18n}
                                            sticky={sticky}
                                        />
                                    )}
                                    {config &&
                                        config.layout.authentication &&
                                        (isAuthenticated ? (
                                            <Account
                                                config={config}
                                                i18n={i18n}
                                                sticky={sticky}
                                            />
                                        ) : (
                                            <Login
                                                config={config}
                                                i18n={i18n}
                                                sticky={sticky}
                                            />
                                        ))}
                                </div>
                                <Title config={config} i18n={i18n} />
                            </>
                        ) : (
                            <>
                                <Title config={config} i18n={i18n} />
                                <div>
                                    {themePreference && (
                                        <ThemeButton
                                            config={config}
                                            i18n={i18n}
                                            sticky={sticky}
                                            themePreference={themePreference}
                                        />
                                    )}
                                    {locale && locales && (
                                        <Language
                                            config={config}
                                            i18n={i18n}
                                            sticky={sticky}
                                        />
                                    )}
                                    {config &&
                                        config.layout.authentication &&
                                        (isAuthenticated ? (
                                            <Account
                                                config={config}
                                                i18n={i18n}
                                                sticky={sticky}
                                            />
                                        ) : (
                                            <Login
                                                config={config}
                                                i18n={i18n}
                                                sticky={sticky}
                                            />
                                        ))}
                                </div>
                            </>
                        )}
                    </nav>
                    <Submenu config={config} i18n={i18n} sticky={sticky} />
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

                                font-size: 16px;
                                height: 54px;
                                box-sizing: border-box;
                            }
                            .Navigation > div {
                                display: flex;
                                align-items: center;
                            }
                            .btn-dropdown {
                                margin-left: 0.5rem;
                            }
                        `}
                    </style>
                </>
            )}
        </>
    )
}
