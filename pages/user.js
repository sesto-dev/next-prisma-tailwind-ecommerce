import {
    handleUserData,
    logoutHandler,
    getGoogleURL,
    useWindowSize,
    GoogleIcon,
} from 'aryana'

import essentials from '../helpers/getEssentials'

import { useEffect, useState } from 'react'
import { LogOut } from '@geist-ui/icons'
import {
    useToasts,
    Description,
    Button,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
    Collapse,
    Snippet,
    Table,
} from '@geist-ui/core'

export default function ({ auth }) {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials
    const { setMeta } = useMeta()
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    useEffect(() => {
        setLocalAuthentication(auth)
    }, [])

    const { locale = config['defaultLocale'] } = useRouter()

    const {
        title,
        description,
        info,
        referrals,
        orders,
        integrations,
        logout,
    } = i18n['pages']['user']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function resolve() {
            const response = await axios.get(config.routes.backend.user)

            handleUserData({
                response,
                router,
                setUser,
                setToast,
                noDataToast: i18n['toasts']['noData'][locale],
                notVerifiedToast: i18n['toasts']['notVerified'][locale],
                Link,
                notVerifiedRedirectURI: config.routes.frontend.verify,
            })
        }

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Binder>
            <Collapse.Group>
                <Collapse
                    title={info['title'][locale]}
                    subtitle={info['description'][locale]}
                >
                    <UserInfo user={user} />
                </Collapse>
                <Collapse
                    title={orders['title'][locale]}
                    subtitle={orders['description'][locale]}
                >
                    <Orders user={user} />
                </Collapse>
                <Collapse
                    title={referrals['title'][locale]}
                    subtitle={referrals['description'][locale]}
                >
                    <Referrals user={user} />
                </Collapse>
                <Collapse
                    title={integrations['title'][locale]}
                    subtitle={integrations['description'][locale]}
                >
                    <Integrations user={user} />
                </Collapse>
                <Collapse
                    title={logout['title'][locale]}
                    subtitle={logout['description'][locale]}
                    style={{ borderBottom: 'none' }}
                >
                    <Logout />
                </Collapse>
            </Collapse.Group>
        </Binder>
    )
}

const Binder = ({ children }) => {
    const theme = useTheme()

    return (
        <Grid.Container gap={1}>
            <Grid xs={24}>
                <Card
                    width="100%"
                    style={{
                        backgroundColor: theme.palette.accents_1,
                    }}
                >
                    {children}
                </Card>
            </Grid>
        </Grid.Container>
    )
}

const UserInfo = ({ user }) => {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    const { locale = config['defaultLocale'] } = useRouter()

    const { info } = i18n['pages']['user']

    return (
        <Grid.Container gap={1}>
            {user ? (
                <>
                    <Grid xs={24} md={12}>
                        {user.name && (
                            <Description
                                width="100%"
                                title={info['name'][locale]}
                                content={
                                    <Text
                                        width="100%"
                                        mt={0}
                                        blockquote
                                        font="1rem"
                                    >
                                        {user.name}
                                    </Text>
                                }
                            />
                        )}
                    </Grid>
                    <Grid xs={24} md={12}>
                        <Description
                            width="100%"
                            title={info['email'][locale]}
                            content={
                                <Text
                                    width="100%"
                                    mt={0}
                                    blockquote
                                    font="1rem"
                                >
                                    {user.email}
                                </Text>
                            }
                        />
                    </Grid>
                    <Grid xs={24} md={12}>
                        <Description
                            width="100%"
                            title={info['referral'][locale]}
                            content={
                                <Snippet
                                    symbol=""
                                    font="1rem"
                                    toastText={i18n['toasts']['copied'][locale]}
                                    toastType="default"
                                    text={user.referral_code}
                                />
                            }
                        />
                    </Grid>
                </>
            ) : (
                <Loading />
            )}
        </Grid.Container>
    )
}

const Orders = ({ user }) => {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    return (
        <Card id="Orders" width="100%">
            {user && user.orders ? (
                <Table data={user.orders}>
                    <Table.Column prop="link" label="Link" width={100} />
                    <Table.Column prop="createdAt" label="Date" width={220} />
                    {width > 650 && (
                        <>
                            <Table.Column prop="totalPrice" label="Price" />
                            <Table.Column prop="isPaid" label="Paid" />
                            <Table.Column
                                prop="isDelivered"
                                label="Delivered"
                            />
                        </>
                    )}
                </Table>
            ) : (
                <Loading />
            )}
        </Card>
    )
}

const Referrals = ({ user }) => {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials

    return (
        <Card width="100%">
            {user && user.referrals ? (
                <Table data={user.referrals}>
                    <Table.Column prop="createdAt" label="Date" />
                    <Table.Column prop="totalPrice" label="Price" />
                </Table>
            ) : (
                <Loading />
            )}
        </Card>
    )
}

const Integrations = ({ user }) => {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    const { locale = config['defaultLocale'] } = useRouter()

    return (
        <Grid.Container width="100%" gap={1}>
            {user ? (
                <Grid width="100%" xs={24} sm={12} md={8}>
                    {user.integrations.google.id ? (
                        <Button
                            icon={<GoogleIcon color={theme.palette.code} />}
                            disabled
                            type="secondary"
                            width="100%"
                            style={{
                                border: `1px solid ${theme.palette.code}`,
                                color: theme.palette.code,
                            }}
                        >
                            {i18n['buttons']['google']['inactive'][locale]}
                        </Button>
                    ) : (
                        <a
                            style={{ width: '100%' }}
                            href={getGoogleURL(
                                process.env
                                    .NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
                                process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID
                            )}
                        >
                            <Button
                                icon={<GoogleIcon />}
                                type="secondary"
                                width="100%"
                                onClick={() => {}}
                            >
                                {i18n['buttons']['google']['active'][locale]}
                            </Button>
                        </a>
                    )}
                </Grid>
            ) : (
                <Loading />
            )}
        </Grid.Container>
    )
}

const Logout = () => {
    const { config, i18n, Link, axios, useAuth, useRouter, useMeta } =
        essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    const { locale = config['defaultLocale'] } = router
    const { logout } = i18n['pages']['user']

    async function onLogout() {
        const response = await axios.post(config.routes.backend.logout)

        logoutHandler({
            response,
            setToast,
            setLocalAuthentication,
            router,
            toast: i18n['toasts']['logout'][locale],
            redirect_uri: config.routes.frontend.root,
        })
    }

    return (
        <Button
            icon={<LogOut />}
            scale={1.2}
            type="secondary"
            px={2}
            onClick={onLogout}
            width={width < 650 && '100%'}
            auto={width > 650}
        >
            <b>{logout['title'][locale].toUpperCase()}</b>
        </Button>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
