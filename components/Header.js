import Link from 'next/link'
import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
    Modal,
    Collapse,
    Input,
    Divider,
    Tabs,
    Text,
    useTheme,
    Drawer,
    ButtonGroup,
    Button,
    useToasts,
} from '@geist-ui/core'
import {
    Sun,
    Moon,
    LogIn,
    User,
    UserPlus,
    ShoppingCart,
    Menu,
    Search,
    Globe,
} from '@geist-ui/icons'

import { getLocaleDirection, isLocaleRTL } from '../helpers/RTL'
import { useAuth } from '../state/Auth'
import { GoogleIcon } from './SVGs'
import useWindowSize from '../hooks/useWindowSize'
import getGoogleURL from '../helpers/getGoogleURL'
import isEmail from '../helpers/isEmail'
import { registerHandler, loginHandler } from '../handlers/AuthHandlers'

export default function ({ config, i18n, useThemeProvider }) {
    const theme = useTheme()
    const themeProvider = useThemeProvider()
    const { width, height } = useWindowSize()
    const router = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    const {
        locale = config.defaultLocale,
        locales,
        pathname,
        asPath,
        query,
    } = router

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length
    }

    const [sticky, setSticky] = useState(false)
    const [drawerVis, setDrawerVis] = useState(false)
    const [placement, setPlacement] = useState('')
    const [modalVis, setModalVis] = useState(false)

    useEffect(() => {
        const scrollHandler = () =>
            setSticky(document.documentElement.scrollTop > 54)
        document.addEventListener('scroll', scrollHandler)
        return () => document.removeEventListener('scroll', scrollHandler)
    }, [setSticky])

    const matchedURL = router['pathname'].match(/(?:^\/)?[^/]+/g)

    function drawDrawer() {
        setPlacement('left')
        setDrawerVis(true)
    }

    const LoginModal = () => {
        const buttons = i18n['buttons']

        const [email, setEmail, refEmail] = useState('')
        const [password, setPassword, refPassword] = useState('')
        const [confirmPassword, setConfirmPassword, refConfirmPassword] =
            useState('')
        const [loading, setLoading, refLoading] = useState(false)

        return (
            <>
                {config && i18n && buttons && (
                    <Modal
                        py={0.2}
                        visible={modalVis}
                        onClose={() => setModalVis(false)}
                    >
                        <Modal.Content pt={0.5} pb={2.5}>
                            <Collapse.Group>
                                <Collapse
                                    title={
                                        <Text
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                            }}
                                            my={0}
                                        >
                                            Login
                                        </Text>
                                    }
                                    subtitle={
                                        <Text small>with Email & Password</Text>
                                    }
                                >
                                    <Input
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['email']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['email']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['email'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        width="100%"
                                        value={email}
                                        type={
                                            refEmail.current == ''
                                                ? 'default'
                                                : isEmail(refEmail.current)
                                                ? 'default'
                                                : 'error'
                                        }
                                        onChange={(e) => {
                                            setEmail(e.target.value.trim())
                                        }}
                                    />
                                    <Input.Password
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['password'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        width="100%"
                                        mt={1}
                                        value={password}
                                        type={
                                            refPassword.current == ''
                                                ? 'default'
                                                : refPassword.current.length > 7
                                                ? 'default'
                                                : 'error'
                                        }
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim())
                                        }}
                                    />
                                    <Button
                                        loading={loading}
                                        disabled={
                                            !refEmail.current ||
                                            !refPassword.current ||
                                            !isEmail(refEmail.current) ||
                                            refPassword.current.length < 8
                                        }
                                        width="100%"
                                        mt={1}
                                        type="secondary"
                                        onClick={(e) =>
                                            loginHandler({
                                                config,
                                                setLoading,
                                                setToast,
                                                setLocalAuthentication,
                                                router,
                                                refEmail,
                                                refPassword,
                                                toast: i18n['toasts']['login'][
                                                    locale
                                                ],
                                            })
                                        }
                                        icon={<LogIn />}
                                    >
                                        {buttons['login'][locale]}
                                    </Button>
                                    <Link href="/auth/reset">
                                        <a className="Peculiar">
                                            <Text
                                                style={{
                                                    direction:
                                                        getLocaleDirection(
                                                            locale
                                                        ),
                                                    textAlign: isLocaleRTL(
                                                        locale
                                                    )
                                                        ? 'right'
                                                        : 'left',
                                                }}
                                            >
                                                {buttons['forgot'][locale]}
                                            </Text>
                                        </a>
                                    </Link>
                                </Collapse>
                                <Collapse
                                    id="Register"
                                    style={{ borderBottom: 'none' }}
                                    title={
                                        <Text
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                            }}
                                            my={0}
                                        >
                                            Register
                                        </Text>
                                    }
                                    subtitle={
                                        <Text small>with Email & Password</Text>
                                    }
                                >
                                    <Input
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['email']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['email']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['email'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        width="100%"
                                        value={email}
                                        type={
                                            refEmail.current == ''
                                                ? 'default'
                                                : isEmail(refEmail.current)
                                                ? 'success'
                                                : 'error'
                                        }
                                        onChange={(e) => {
                                            setEmail(e.target.value.trim())
                                        }}
                                    />
                                    {!refEmail.current == '' &&
                                        !isEmail(refEmail.current) && (
                                            <Text
                                                style={{
                                                    direction:
                                                        getLocaleDirection(
                                                            locale
                                                        ),
                                                }}
                                                small
                                                type="error"
                                            >
                                                {
                                                    i18n['inputs']['email'][
                                                        'error'
                                                    ][locale]
                                                }
                                            </Text>
                                        )}
                                    <Input.Password
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['password']['label'][
                                                locale
                                            ]
                                        }
                                        placeholder={
                                            i18n['inputs']['password'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        type={
                                            refPassword.current == ''
                                                ? 'default'
                                                : refPassword.current.length > 7
                                                ? 'success'
                                                : 'error'
                                        }
                                        width="100%"
                                        mt={1}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim())
                                        }}
                                    />
                                    {!refPassword.current == '' &&
                                        refPassword.current.length < 8 && (
                                            <Text small type="error">
                                                {
                                                    i18n['inputs']['password'][
                                                        'error'
                                                    ][locale]
                                                }
                                            </Text>
                                        )}
                                    <Input.Password
                                        label={
                                            !isLocaleRTL(locale) &&
                                            i18n['inputs']['confirmPassword'][
                                                'label'
                                            ][locale]
                                        }
                                        labelRight={
                                            isLocaleRTL(locale) &&
                                            i18n['inputs']['confirmPassword'][
                                                'label'
                                            ][locale]
                                        }
                                        placeholder={
                                            i18n['inputs']['confirmPassword'][
                                                'placeholder'
                                            ][locale]
                                        }
                                        type={
                                            refConfirmPassword.current == ''
                                                ? 'default'
                                                : refConfirmPassword.current
                                                      .length > 7 &&
                                                  refConfirmPassword.current ==
                                                      refPassword.current
                                                ? 'success'
                                                : 'error'
                                        }
                                        width="100%"
                                        mt={1}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(
                                                e.target.value.trim()
                                            )
                                        }}
                                    />
                                    {!refConfirmPassword.current == '' &&
                                        refConfirmPassword.current.length <
                                            8 && (
                                            <Text small type="error">
                                                {
                                                    i18n['inputs'][
                                                        'confirmPassword'
                                                    ]['error'][locale]
                                                }{' '}
                                            </Text>
                                        )}
                                    {!refConfirmPassword.current == '' &&
                                        refConfirmPassword.current !=
                                            refPassword.current && (
                                            <Text small type="error">
                                                {
                                                    i18n['inputs']['password'][
                                                        'error'
                                                    ][locale]
                                                }
                                            </Text>
                                        )}
                                    <Button
                                        loading={loading}
                                        disabled={
                                            !refEmail.current ||
                                            !refPassword.current ||
                                            refConfirmPassword.current !=
                                                refPassword.current ||
                                            !isEmail(refEmail.current) ||
                                            refPassword.current.length < 8 ||
                                            refConfirmPassword.current.length <
                                                8
                                        }
                                        width="100%"
                                        mt={1}
                                        type="secondary"
                                        onClick={(e) =>
                                            registerHandler({
                                                config,
                                                setLoading,
                                                setToast,
                                                setLocalAuthentication,
                                                router,
                                                refEmail,
                                                refPassword,
                                            })
                                        }
                                        icon={<UserPlus />}
                                    >
                                        {buttons['register'][locale]}
                                    </Button>
                                </Collapse>
                            </Collapse.Group>
                            <Divider mt={1} mb={3}>
                                OR
                            </Divider>
                            <a href={getGoogleURL()}>
                                <Button
                                    icon={<GoogleIcon />}
                                    type="secondary"
                                    width="100%"
                                    mt={0.8}
                                    onClick={() => {}}
                                >
                                    Sign in with Google
                                </Button>
                            </a>
                        </Modal.Content>
                    </Modal>
                )}
                <style jsx global>
                    {`
                        input::placeholder {
                            text-align: ${isLocaleRTL(locale)
                                ? 'right'
                                : 'left'};
                            direction: ${getLocaleDirection(locale)} !important;
                        }
                        .Peculiar {
                            color: ${theme.palette.accents_6}!important;
                            font-size: 0.75rem;
                        }
                        .Peculiar:hover {
                            color: ${theme.palette.code}!important;
                        }
                    `}
                </style>
            </>
        )
    }

    const Title = () => (
        <>
            {i18n && (
                <>
                    <Text mt={1.5} className="MenuNavigationTitle">
                        <Link className="MenuNavigationTitle" href="/">
                            {i18n['components']['header']['title'][
                                locale
                            ].toUpperCase()}
                        </Link>
                    </Text>
                </>
            )}
            <style jsx global>
                {`
                    .MenuNavigationTitle a {
                        color: ${theme.palette.foreground}!important;
                        font-size: 2.2rem;
                        font-weight: 600;
                        letter-spacing: ${locale == 'en' ? '0.3rem' : 0};
                    }
                `}
            </style>
        </>
    )

    const Submenu = () => {
        const submenu = i18n['components']['header']['submenu']

        return (
            <>
                {config && i18n && submenu && (
                    <nav className="SubmenuWrapper">
                        <div
                            className={`Submenu ${
                                sticky ? 'SubmenuSticky' : ''
                            }`}
                        >
                            <div className="SubmenuInner">
                                <Tabs
                                    align="center"
                                    value={
                                        matchedURL
                                            ? matchedURL[0]
                                            : router.pathname
                                    }
                                    onChange={(route) => router.push(route)}
                                >
                                    {submenu.unprotected.map((tab) => {
                                        return (
                                            <Tabs.Item
                                                key={tab['label'][locale]}
                                                label={tab['label'][locale]}
                                                value={tab.value}
                                            />
                                        )
                                    })}
                                    {submenu.protected.map((tab) => (
                                        <Tabs.Item
                                            key={tab['label'][locale]}
                                            label={tab['label'][locale]}
                                            value={tab.value}
                                            disabled={!isAuthenticated}
                                        />
                                    ))}
                                </Tabs>
                            </div>
                        </div>
                    </nav>
                )}
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
                            width: ${config.theme.width};
                            max-width: 100%;
                            margin: 0 auto;
                            padding: 0 ${theme.layout.pageMargin};
                            height: 50px;
                            overflow-y: hidden;
                            overflow-x: auto;
                            overflow: -moz-scrollbars-none;
                            -ms-overflow-style: none;
                            -webkit-overflow-scrolling: touch;
                            scrollbar-width: none;
                            box-sizing: border-box;
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
                            font-size: 0.9rem !important;
                        }
                        .SubmenuInner .tab:hover {
                            color: ${theme.palette.foreground};
                        }
                        .SubmenuInner .active {
                            color: ${theme.palette.foreground};
                            border: none !important;
                        }
                    `}
                </style>
            </>
        )
    }

    const TabletNav = () => (
        <>
            <div>
                <Button
                    type="secondary"
                    ghost
                    style={{ border: 'none' }}
                    auto
                    icon={<Search />}
                />
                {themeProvider && (
                    <Button
                        icon={theme.type === 'dark' ? <Sun /> : <Moon />}
                        aria-label="Toggle Theme"
                        mx={0.5}
                        type="secondary"
                        ghost
                        style={{ border: 'none' }}
                        auto
                        onClick={() =>
                            themeProvider.setLocalTheme(
                                theme.type === 'dark' ? 'light' : 'dark'
                            )
                        }
                    />
                )}
                {/* {locales && (
                    <Button
                        type="secondary"
                        ghost
                        auto
                        style={{ border: 'none' }}
                        icon={<Globe />}
                        onClick={() => loopLanguages()}
                    />
                )} */}
            </div>
            <Title config={config} i18n={i18n} />
            <div>
                {isAuthenticated ? (
                    <>
                        <Link href="/cart">
                            <Button
                                icon={<ShoppingCart />}
                                aria-label="Shopping Cart"
                                mx={0.5}
                                type="secondary"
                                ghost
                                style={{ border: 'none' }}
                                auto
                            />
                        </Link>
                        <Link href="/user">
                            <Button
                                icon={<User />}
                                aria-label="Toggle Theme"
                                type="secondary"
                                ghost
                                style={{ border: 'none' }}
                                auto
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Button
                            icon={<LogIn />}
                            aria-label="Login Button"
                            type="secondary"
                            style={{ border: 'none' }}
                            auto
                            px={1.2}
                            onClick={(e) => setModalVis(true)}
                        >
                            Login
                        </Button>
                        <LoginModal />
                    </>
                )}
            </div>
        </>
    )

    const PhoneNav = () => (
        <>
            <Button
                type="secondary"
                ghost
                style={{ border: 'none' }}
                auto
                icon={<Search />}
            />
            <Title config={config} i18n={i18n} />
            <Button
                type="secondary"
                ghost
                style={{ border: 'none' }}
                auto
                icon={<Menu />}
                onClick={() => drawDrawer()}
            />
            <Drawer
                visible={drawerVis}
                onClose={() => setDrawerVis(false)}
                placement={placement}
                width="60%"
            >
                <Drawer.Content>
                    {
                        <ButtonGroup
                            type="secondary"
                            mx={0}
                            mb={2}
                            width="100%"
                        >
                            <Button
                                disabled={theme.type === 'dark'}
                                icon={<Moon />}
                                scale={1.3}
                                aria-label="Toggle Dark Mode"
                                onClick={() =>
                                    themeProvider.setLocalTheme('dark')
                                }
                            />
                            <Button
                                disabled={theme.type === 'light'}
                                icon={<Sun />}
                                scale={1.3}
                                aria-label="Toggle Light Mode"
                                onClick={() =>
                                    themeProvider.setLocalTheme('light')
                                }
                            />
                        </ButtonGroup>
                    }
                    {/* {locales && (
                        <Button
                            type="secondary"
                            width="100%"
                            scale={1.5}
                            mb={0.5}
                            icon={<Globe />}
                            onClick={() => loopLanguages()}
                        />
                    )} */}
                    {isAuthenticated ? (
                        <>
                            <Link href="/cart">
                                <Button
                                    icon={<ShoppingCart />}
                                    aria-label="Shopping Cart"
                                    type="secondary"
                                    width="100%"
                                    scale={1.5}
                                    mb={0.5}
                                    style={{ border: 'none' }}
                                />
                            </Link>
                            <Link href="/user">
                                <Button
                                    icon={<User />}
                                    aria-label="Toggle Theme"
                                    type="secondary"
                                    width="100%"
                                    scale={1.5}
                                    style={{ border: 'none' }}
                                />
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button
                                icon={<LogIn />}
                                aria-label="Login Button"
                                type="secondary"
                                style={{ border: 'none' }}
                                width="100%"
                                scale={1.5}
                                onClick={(e) => setModalVis(true)}
                            />
                            <LoginModal />
                        </>
                    )}
                </Drawer.Content>
            </Drawer>
            <style jsx global>
                {`
                    .btn-group > button {
                        width: 100% !important;
                    }
                `}
            </style>
        </>
    )

    const Binder = ({ children }) => (
        <>
            {config && i18n && (
                <>
                    <nav className="Navigation">{children}</nav>
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
                                padding: 2rem ${theme.layout.pageMargin};
                                height: 55px;
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

    return <Binder>{width > 650 ? <TabletNav /> : <PhoneNav />}</Binder>
}
