import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useSession, signIn, signOut } from 'next-auth/react'
import {
    useToasts,
    Text,
    Button,
    useTheme,
    Tabs,
    Spacer,
    Popover,
} from '@geist-ui/core'

const Header = ({ config, themePreference }) => {
    const theme = useTheme()
    const title = config.meta.title
    const uppercaseTitle = title.toUpperCase()

    return (
        <>
            <nav className="MenuNavigation">
                <Text mt={1.5} className="MenuNavigationTitle">
                    <Link className="MenuNavigationTitle" href="/">
                        {uppercaseTitle}
                    </Link>
                </Text>
                <div>
                    {themePreference && (
                        <HeaderOptions themePreference={themePreference} />
                    )}
                </div>
            </nav>
            <Submenu config={config} />
            <style jsx global>
                {`
                    .MenuNavigation {
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
                    .MenuNavigationTitle a {
                        color: ${theme.palette.accents_5}!important;
                        font-size: 1.65rem;
                        font-weight: 450;
                        letter-spacing: 0.3rem;
                    }
                    .MenuNavigationTitle a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                    .MenuNavigation > div {
                        display: flex;
                        align-items: center;
                    }
                `}
            </style>
        </>
    )
}

const HeaderOptions = ({ themePreference }) => {
    const prefers = themePreference()
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
            <Button
                style={
                    sticky
                        ? {
                              top: '1.5px',
                          }
                        : {}
                }
                aria-label="Toggle Dark mode"
                ml={0.3}
                mr={0.5}
                px={1.4}
                scale={0.6}
                auto
                onClick={() =>
                    prefers.switchTheme(
                        theme.type === 'dark' ? 'light' : 'dark'
                    )
                }
            >
                <Text b>{theme.type === 'dark' ? 'LIGHT' : 'DARK'}</Text>
            </Button>
            <Account sticky={sticky} />
        </>
    )
}

const Account = ({ sticky }) => {
    const theme = useTheme()
    const { data: session } = useSession()
    const {
        toasts,
        setToast,
        removeAll,
        findToastOneByID,
        removeToastOneByID,
    } = useToasts()

    const provider = {
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/google`,
        id: 'google',
        name: 'Google',
        signinUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/signin/google`,
        type: 'oauth',
    }

    if (session) {
        const content = () => (
            <>
                <Popover.Item>
                    <Button onClick={() => signOut(provider.id)}>Logout</Button>
                </Popover.Item>
            </>
        )

        return (
            <Popover content={content}>
                <Button
                    style={
                        sticky
                            ? {
                                  top: '1.5px',
                              }
                            : {}
                    }
                    aria-label="Toggle Dark mode"
                    ml={0.3}
                    px={1.4}
                    scale={0.6}
                >
                    <Text b>{session['user']['email'].toUpperCase()}</Text>
                </Button>
            </Popover>
        )
    } else {
        return (
            <Button
                style={
                    sticky
                        ? {
                              top: '1.5px',
                          }
                        : {}
                }
                ml={0.3}
                px={1.4}
                auto
                scale={0.6}
                icon={<GoogleIcon />}
                onClick={() => signIn(provider.id)}
                key={provider.name}
            >
                <Text b>Sign in with {provider.name}</Text>
            </Button>
        )
    }
}

const Submenu = ({ config }) => {
    const router = useRouter()
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
            <nav className="SubmenuWrapper">
                <div className={`Submenu ${sticky ? 'SubmenuSticky' : ''}`}>
                    <div className="SubmenuInner">
                        <Tabs
                            value={router.pathname}
                            onChange={(route) => router.push(route)}
                        >
                            <Tabs.Item ml={0} label={'HOME'} value="/" />
                            {config.tabs.map((tab) => (
                                <Tabs.Item
                                    key={tab.label}
                                    label={tab.label}
                                    value={tab.value}
                                />
                            ))}
                        </Tabs>
                    </div>
                </div>
            </nav>
            <style jsx global>
                {`
                    .scroll-container {
                        padding-left: 0px !important;
                        border: none !important;
                    }
                    .SubmenuWrapper {
                        height: 50px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: inset 0 -1px ${theme.palette.border};
                    }
                    .SubmenuSticky {
                        transition: box-shadow 1s ease;
                    }
                    .SubmenuSticky {
                        position: fixed;
                        z-index: 1100;
                        top: 0;
                        right: 0;
                        left: 0;
                        background: ${theme.palette.background};
                        box-shadow: ${theme.type === 'dark'
                            ? `inset 0 -1px ${theme.palette.border}`
                            : 'rgba(0, 0, 0, 0.1) 0 0 15px 0'};
                    }
                    .SubmenuInner {
                        display: flex;
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        height: 50px;
                        box-sizing: border-box;
                        overflow-y: hidden;
                        overflow-x: auto;
                        overflow: -moz-scrollbars-none;
                        -ms-overflow-style: none;
                        -webkit-overflow-scrolling: touch;
                        scrollbar-width: none;
                        box-sizing: border-box;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .SubmenuInner::-webkit-scrollbar {
                        display: none;
                    }
                    .SubmenuInner .content {
                        display: none;
                    }
                    .SubmenuInner .tabs,
                    .SubmenuInner header {
                        height: 100%;
                        border: none !important;
                    }
                    .SubmenuInner .tab {
                        height: calc(100% - 2px);
                        padding-top: 0;
                        padding-bottom: 0;
                        color: ${theme.palette.accents_5};
                        font-size: 0.825rem;
                    }
                    .SubmenuInner .tab:hover {
                        color: ${theme.palette.foreground};
                    }
                    .SubmenuInner .active {
                        color: ${theme.palette.foreground};
                        border: none !important;
                    }
                    @media (max-width: ${theme.breakpoints.sm.max}) {
                        .headerOptions {
                            display: none;
                        }
                    }
                `}
            </style>
        </>
    )
}

const GoogleIcon = () => {
    const theme = useTheme()

    return (
        <svg
            fill={theme.palette.accents_4}
            width="1024px"
            height="1024px"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
        >
            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
        </svg>
    )
}

export default Header
