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
} from '@geist-ui/core'

import Layout from '../components/Layout'
import { useThemeProvider } from '../state/Theme'
import { handleUserData } from '../handlers/userHandlers'
import { logoutHandler } from '../handlers/authHandlers'

import config from '../config/main.config'
import i18n from '../config/i18n.config'
import { LogOut } from '@geist-ui/icons'

import { useAuth } from '../state/Auth'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

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
                                                content={user.name}
                                                mb={1}
                                            />
                                        )}
                                        <Description
                                            title="Email"
                                            content={user.email}
                                            mb={1}
                                        />
                                        <Description
                                            title="Referral Code"
                                            content={user.referral_code}
                                        />
                                        <Divider mt={3} mb={2} />
                                        <Button
                                            icon={<LogOut />}
                                            scale={0.9}
                                            type="secondary"
                                            ghost
                                            style={{
                                                border: `1px solid ${theme.palette.accents_2}`,
                                            }}
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
                                            auto
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
                                        <Fieldset.Footer>
                                            HTTP Knowledge Base
                                            <Button
                                                auto
                                                scale={1 / 3}
                                                font="12px"
                                            >
                                                Actions
                                            </Button>
                                        </Fieldset.Footer>
                                    </Fieldset>
                                    <Fieldset label="wallet">
                                        <Fieldset.Title>
                                            HTTP is stateless
                                        </Fieldset.Title>
                                        <Fieldset.Subtitle>
                                            HTTP is stateless: there is no link
                                            between two requests being
                                            successively carried out on the same
                                            connection.{' '}
                                        </Fieldset.Subtitle>
                                        <Fieldset.Footer>
                                            HTTP Knowledge Base
                                            <Button
                                                auto
                                                scale={1 / 3}
                                                font="12px"
                                            >
                                                Actions
                                            </Button>
                                        </Fieldset.Footer>
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
