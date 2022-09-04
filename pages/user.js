import {
    Layout,
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
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
    } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    setLocalAuthentication(auth)

    const { locale = config['defaultLocale'] } = useRouter()

    const { info, referrals, orders, integrations, logout } =
        i18n['pages']['user']

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function resolve() {
            const response = await axios.get(
                config['backend']['routes']['user']
            )

            handleUserData({
                response,
                router,
                setUser,
                setToast,
                noDataToast: i18n['toasts']['noData'][locale],
                notVerifiedToast: i18n['toasts']['notVerified'][locale],
                Link,
            })
        }

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function attemptLogout() {
        const response = await axios.post(config.backend.routes.logout)

        logoutHandler({
            response,
            setToast,
            setLocalAuthentication,
            router,
            toast: i18n['toasts']['logout'][locale],
            redirect_uri: '/',
        })
    }

    const UserInfo = ({ user }) => (
        <Grid.Container gap={1}>
            <Grid xs={24} md={12}>
                {user.name && (
                    <Description
                        width="100%"
                        title={info['name'][locale]}
                        content={
                            <Text width="100%" mt={0} blockquote font="1rem">
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
                        <Text width="100%" mt={0} blockquote font="1rem">
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
                            font="1rem"
                            toastText="✓ Referral-Code copied!"
                            toastType="default"
                            text={user.referral_code}
                        />
                    }
                />
            </Grid>
        </Grid.Container>
    )

    const Orders = ({ user }) => {
        return (
            <Card id="Orders" width="100%">
                {user && user.orders && (
                    <Table data={user.orders}>
                        <Table.Column prop="link" label="Link" width={100} />
                        <Table.Column
                            prop="createdAt"
                            label="Date"
                            width={220}
                        />
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
                )}
            </Card>
        )
    }

    const Referrals = ({ user }) => (
        <Card width="100%">
            {user && user.referrals && (
                <Table data={user.referrals}>
                    <Table.Column prop="createdAt" label="Date" />
                    <Table.Column prop="totalPrice" label="Price" />
                </Table>
            )}
        </Card>
    )

    const Integrations = ({ user }) => (
        <Grid.Container width="100%" gap={1}>
            <Grid width="100%" xs={24} sm={12} md={8}>
                {user.integrations && user.integrations.google.id ? (
                    <Button
                        icon={<GoogleIcon color={theme.palette.code} />}
                        disabled
                        type="secondary"
                        width="100%"
                        style={{
                            border: `1px solid ${theme.palette.code}`,
                            color: theme.palette.code,
                        }}
                        onClick={() => {}}
                    >
                        {i18n['buttons']['google']['inactive'][locale]}
                    </Button>
                ) : (
                    <a
                        style={{ width: '100%' }}
                        href={getGoogleURL(
                            process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
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
        </Grid.Container>
    )

    const Logout = () => (
        <Button
            icon={<LogOut />}
            scale={1.2}
            type="secondary"
            px={2}
            onClick={attemptLogout}
            width={width < 650 && '100%'}
            auto={width > 650}
        >
            <b>{logout['title'][locale]}</b>
        </Button>
    )

    return (
        <>
            <Layout essentials={essentials}>
                <Grid.Container gap={1}>
                    {user ? (
                        <>
                            <Grid xs={24}>
                                <Card
                                    width="100%"
                                    style={{
                                        backgroundColor:
                                            theme.palette.accents_1,
                                    }}
                                >
                                    <Collapse.Group>
                                        <Collapse
                                            title={info['title'][locale]}
                                            subtitle={
                                                info['description'][locale]
                                            }
                                        >
                                            <UserInfo user={user} />
                                        </Collapse>
                                        <Collapse
                                            title={orders['title'][locale]}
                                            subtitle={
                                                orders['description'][locale]
                                            }
                                        >
                                            <Orders user={user} />
                                        </Collapse>
                                        <Collapse
                                            title={referrals['title'][locale]}
                                            subtitle={
                                                referrals['description'][locale]
                                            }
                                        >
                                            <Referrals user={user} />
                                        </Collapse>
                                        <Collapse
                                            title={
                                                integrations['title'][locale]
                                            }
                                            subtitle={
                                                integrations['description'][
                                                    locale
                                                ]
                                            }
                                        >
                                            <Integrations user={user} />
                                        </Collapse>
                                        <Collapse
                                            title={logout['title'][locale]}
                                            subtitle={
                                                logout['description'][locale]
                                            }
                                            style={{ borderBottom: 'none' }}
                                        >
                                            <Logout />
                                        </Collapse>
                                    </Collapse.Group>
                                </Card>
                            </Grid>
                        </>
                    ) : (
                        <Grid xs={24}>
                            <Card
                                width="100%"
                                height="20rem"
                                py="8rem"
                                style={{
                                    backgroundColor: theme.palette.accents_1,
                                }}
                            >
                                <Loading />
                            </Card>
                        </Grid>
                    )}
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    .group-tabs > button {
                        background-color: ${theme.palette.accents_1}!important;
                    }
                    .group-content > .fieldset > .content {
                        background-color: ${theme.palette.accents_1};
                    }
                    tbody > tr:last-child > td {
                        border-bottom: none !important;
                    }
                `}
            </style>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
