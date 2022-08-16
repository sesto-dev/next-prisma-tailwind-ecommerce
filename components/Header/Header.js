import { useState, useEffect } from 'react'
import { Grid, useTheme, Drawer, Button } from '@geist-ui/core'
import { useRouter } from 'next/router'

import Submenu from './Submenu'
import ThemeButton from './ThemeButton'
import Title from './Title'
import Language from './Language'
import Login from './Login'
import Account from './Account'

import { isLocaleRTL } from '../../helpers/RTL'
import Cart from './Cart'
import { useAuth } from '../../state/Auth'
import { MenuIcon } from '../SVGs'

export default function ({ config, i18n, useThemeProvider }) {
    const { isAuthenticated } = useAuth()

    const theme = useTheme()
    const { locale = config.defaultLocale, locales } = useRouter()

    const [sticky, setSticky] = useState(false)
    const [drawerVisibility, setDrawerVisibility] = useState(false)
    const [placement, setPlacement] = useState('')
    const draw = () => {
        setPlacement(isLocaleRTL(locale) ? 'right' : 'left')
        setDrawerVisibility(true)
    }

    useEffect(() => {
        const scrollHandler = () =>
            setSticky(document.documentElement.scrollTop > 54)
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [setSticky])

    const Menu = () => (
        <>
            <Button
                auto
                onClick={() => draw()}
                scale={0.8}
                icon={<MenuIcon />}
            />
            <Drawer
                visible={drawerVisibility}
                onClose={() => setDrawerVisibility(false)}
                placement={placement}
                width="60%"
            >
                <Drawer.Content>
                    {isLocaleRTL(locale) ? <RTL /> : <LTR />}
                </Drawer.Content>
            </Drawer>
        </>
    )

    const LTR = () => (
        <>
            {useThemeProvider && (
                <ThemeButton
                    config={config}
                    i18n={i18n}
                    useThemeProvider={useThemeProvider}
                />
            )}
            {config.layout.authentication &&
                (isAuthenticated ? (
                    <>
                        <Cart config={config} i18n={i18n} />
                        <Account config={config} i18n={i18n} />
                    </>
                ) : (
                    <Login config={config} i18n={i18n} />
                ))}
            {locales && <Language config={config} i18n={i18n} />}
        </>
    )

    const RTL = () => (
        <>
            {locales && <Language config={config} i18n={i18n} />}
            {config.layout.authentication &&
                (isAuthenticated ? (
                    <>
                        <Account config={config} i18n={i18n} />
                        <Cart config={config} i18n={i18n} />
                    </>
                ) : (
                    <Login config={config} i18n={i18n} />
                ))}
            {useThemeProvider && (
                <ThemeButton
                    config={config}
                    i18n={i18n}
                    useThemeProvider={useThemeProvider}
                />
            )}
        </>
    )

    return (
        <>
            {config && i18n && (
                <>
                    <nav className="Navigation">
                        {isLocaleRTL(locale) ? (
                            <>
                                <div style={{ marginTop: '1rem' }}>
                                    <Grid.Container>
                                        <Grid xs={0} sm={24}>
                                            <RTL />
                                        </Grid>
                                        <Grid xs={24} sm={0}>
                                            <Menu />
                                        </Grid>
                                    </Grid.Container>
                                </div>
                                <Title config={config} i18n={i18n} />
                            </>
                        ) : (
                            <>
                                <Title config={config} i18n={i18n} />
                                <div style={{ marginTop: '0.3rem' }}>
                                    <Grid.Container>
                                        <Grid xs={24} sm={0}>
                                            <Menu />
                                        </Grid>
                                        <Grid xs={0} sm={24}>
                                            <LTR />
                                        </Grid>
                                    </Grid.Container>
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
                                padding: 1.5rem ${theme.layout.pageMargin};
                                height: 60px;
                                box-sizing: border-box;
                            }
                            .Navigation > div {
                                display: flex;
                                align-items: center;
                            }
                            .MainDropdown {
                                margin-left: ${isLocaleRTL(locale)
                                    ? ''
                                    : '0.5rem'};
                                margin-right: ${isLocaleRTL(locale)
                                    ? '0.5rem'
                                    : ''};
                            }
                            .MainDropdown > button {
                                white-space: nowrap;
                            }
                        `}
                    </style>
                </>
            )}
        </>
    )
}
