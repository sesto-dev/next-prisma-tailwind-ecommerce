import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Description,
    Button,
    Text,
    Divider,
    Loading,
    Card,
    Grid,
    useTheme,
    Fieldset,
    Snippet,
} from '@geist-ui/core'

import Layout from '../components/Layout'
import { useThemeProvider } from '../state/Theme'
import { handleUserData } from '../handlers/userHandlers'
import { logoutHandler } from '../handlers/authHandlers'

import config from '../config/main.config'
import i18n from '../config/i18n.config'
import { LogOut } from '@geist-ui/icons'

import { useAuth } from '../state/Auth'
import useWindowSize from '../hooks/useWindowSize'
import getGoogleURL from '../helpers/getGoogleURL'
import { GoogleIcon } from '../components/SVGs'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()
    const { width, height } = useWindowSize()

    const { locale = config.defaultLocale } = router

    const folio = i18n['root']['user']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [user, setUser] = useState({})

    async function resolve() {
        const response = await axios.get(config.backend.routes.user)
        handleUserData({
            response,
            router,
            setUser,
            setToast,
            noDataReceivedToast: i18n['toasts']['noDataReceived'][locale],
            notVerifiedToast: i18n['toasts']['notVerified'][locale],
        })
    }

    useEffect(() => {
        resolve()
    }, [])

    const handler = (v) => {}

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                useThemeProvider={useThemeProvider}
                metaTitle={title}
            >
                <Grid.Container gap={1}>
                    {user ? (
                        <>
                            <Grid width="100%" xs={24}>
                                <Fieldset.Group
                                    width="100%"
                                    value="user"
                                    onChange={handler}
                                >
                                    <Fieldset label="user info" value="user">
                                        {user.name && (
                                            <Description
                                                title="Name"
                                                content={
                                                    <Text font="1.1rem">
                                                        {user.name}
                                                    </Text>
                                                }
                                                mb={1}
                                            />
                                        )}
                                        <Description
                                            title="Email"
                                            content={
                                                <Text font="1.1rem">
                                                    {user.email}
                                                </Text>
                                            }
                                            mb={1}
                                        />
                                        <Description
                                            title="Referral Code"
                                            content={
                                                <Snippet
                                                    toastText="👍 Copied!"
                                                    toastType="default"
                                                    text={user.referral_code}
                                                />
                                            }
                                            mb={1}
                                        />
                                        <Divider mt={3} mb={2} />
                                        <Button
                                            icon={<LogOut />}
                                            type="secondary"
                                            px={2}
                                            onClick={(e) =>
                                                logoutHandler({
                                                    config,
                                                    setToast,
                                                    setLocalAuthentication,
                                                    router,
                                                    toast: i18n['toasts'][
                                                        'logout'
                                                    ][locale],
                                                })
                                            }
                                            width={width < 650 && '100%'}
                                            auto={width > 650}
                                        >
                                            <b>LOGOUT</b>
                                        </Button>
                                    </Fieldset>
                                    <Fieldset label="orders">
                                        <Fieldset.Subtitle>
                                            Introduced in HTTP/1.0, HTTP headers
                                            make this protocol easy to extend
                                            and experiment with.
                                        </Fieldset.Subtitle>
                                    </Fieldset>
                                    <Fieldset label="referrals">
                                        <Fieldset.Title>
                                            HTTP is stateless
                                        </Fieldset.Title>
                                        <Fieldset.Subtitle>
                                            HTTP is stateless: there is no link
                                            between two requests being
                                            successively carried out on the same
                                            connection.{' '}
                                        </Fieldset.Subtitle>
                                    </Fieldset>
                                    <Fieldset label="integrations">
                                        {user.integrations &&
                                        user.integrations.google.id ? (
                                            <Button
                                                icon={<GoogleIcon />}
                                                disabled
                                                type="secondary"
                                                width="100%"
                                                mt={0.8}
                                                onClick={() => {}}
                                            >
                                                Integrated with Google
                                            </Button>
                                        ) : (
                                            <a href={getGoogleURL()}>
                                                <Button
                                                    icon={<GoogleIcon />}
                                                    type="secondary"
                                                    width="100%"
                                                    mt={0.8}
                                                    onClick={() => {}}
                                                >
                                                    Integrate with Google
                                                </Button>
                                            </a>
                                        )}
                                    </Fieldset>
                                </Fieldset.Group>
                            </Grid>
                        </>
                    ) : (
                        <Grid xs={24}>
                            <Card>
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
                `}
            </style>
        </>
    )
}
