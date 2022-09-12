import { fetchHandler, getGoogleURL, useWindowSize, GoogleIcon } from 'aryana'

import { useEffect, useState } from 'react'
import { LogOut, Link as LinkIcon } from '@geist-ui/icons'

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
import { useAuth } from '../state/Auth'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function ({ auth }) {
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

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function resolve() {
            let response

            try {
                response = await axios.get(config.routes.backend.user)
            } catch (error) {
                response = error.response
            }

            fetchHandler({
                router,
                response,
                setLoading,
                setToast,
                setState: setUser,
                failure_redirect_uri: config.routes.frontend.verify,
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
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    return (
        <Card id="Orders" width="100%">
            {user && user.orders ? (
                <Table
                    width="100%"
                    data={user.orders.map((order) => {
                        return {
                            ...order,
                            link: (
                                <Link href={`/order/${order.id}`}>
                                    <a>
                                        {`Order #${order.index}`}
                                        {'  '}
                                        <LinkIcon size={12} />
                                    </a>
                                </Link>
                            ),
                        }
                    })}
                >
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
    const theme = useTheme()
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
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    const { logoutButtonLoading, setLogoutButtonLoading } = useState(false)

    const { locale = config['defaultLocale'] } = router
    const { logout } = i18n['pages']['user']

    async function onLogout() {
        let response

        try {
            response = await axios.post(config.routes.backend.logout)
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading: setLogoutButtonLoading,
            setToast,
            setState: setLocalAuthentication,
            success_toast: i18n['toasts']['logout'][locale],
            success_redirect_uri: config.routes.frontend.root,
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
