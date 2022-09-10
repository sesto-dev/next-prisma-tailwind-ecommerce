import { useEffect, useState } from 'react'
import { Lock, Mail, LogIn, UserPlus } from '@geist-ui/icons'
import {
    Card,
    Divider,
    Collapse,
    Text,
    Button,
    Grid,
    useTheme,
    useToasts,
    Input,
} from '@geist-ui/core'

import {
    isLocaleRTL,
    fetchHandler,
    getLocaleDirection,
    getGoogleURL,
    GoogleIcon,
    isEmail,
} from 'aryana'
import { useAuth } from '../../state/Auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Head from 'next/head'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config['defaultLocale'] } = router
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const { title, description } = i18n['pages']['login']

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function onLogin() {
        setLoading(true)
        let response

        try {
            response = await axios.post(
                config.routes.backend.login,
                {
                    email,
                    password,
                },
                config.axios.simple
            )
        } catch (error) {
            response = error.response
        }

        console.log({ response })

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            setState: setLocalAuthentication,
            success_toast: i18n['toasts']['login'][locale],
            success_redirect_uri: config.routes.frontend.user,
        })
    }

    async function onRegister() {
        setLoading(true)

        const response = await axios.post(
            config.routes.backend.register,
            {
                email: email,
                password: password,
            },
            config.axios.simple
        )

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            setState: setLocalAuthentication,
            success_redirect_uri: config.routes.frontend.verify,
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24}>
                <Card
                    width="100%"
                    style={{ backgroundColor: theme.palette.accents_1 }}
                >
                    <Collapse.Group>
                        <Collapse
                            title={
                                i18n['components']['header']['modal']['login'][
                                    'title'
                                ][locale]
                            }
                            subtitle={
                                i18n['components']['header']['modal']['login'][
                                    'subtitle'
                                ][locale]
                            }
                        >
                            <Input
                                label={
                                    !isLocaleRTL(locale) && <Mail size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Mail size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['email']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                value={email}
                                type={
                                    email == ''
                                        ? 'default'
                                        : isEmail(email)
                                        ? 'default'
                                        : 'error'
                                }
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value.trim().toLowerCase()
                                    )
                                }
                            />
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['password']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                mt={1}
                                value={password}
                                type={
                                    password == ''
                                        ? 'default'
                                        : password.length > 7
                                        ? 'default'
                                        : 'error'
                                }
                                onChange={(e) =>
                                    setPassword(e.target.value.trim())
                                }
                            />
                            <Button
                                loading={loading}
                                disabled={
                                    !email ||
                                    !password ||
                                    !isEmail(email) ||
                                    password.length < 8
                                }
                                width="100%"
                                mt={1}
                                type="secondary"
                                onClick={onLogin}
                                icon={<LogIn />}
                            >
                                {i18n['buttons']['login'][locale]}
                            </Button>
                            <Link href="/auth/reset">
                                <a
                                    className="Peculiar"
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    <Text
                                        style={{
                                            direction:
                                                getLocaleDirection(locale),
                                            textAlign: isLocaleRTL(locale)
                                                ? 'right'
                                                : 'left',
                                        }}
                                    >
                                        {i18n['buttons']['forgot'][locale]}
                                    </Text>
                                </a>
                            </Link>
                        </Collapse>
                        <Collapse
                            id="Register"
                            style={{ borderBottom: 'none' }}
                            title={
                                i18n['components']['header']['modal'][
                                    'register'
                                ]['title'][locale]
                            }
                            subtitle={
                                i18n['components']['header']['modal'][
                                    'register'
                                ]['subtitle'][locale]
                            }
                        >
                            <Input
                                label={
                                    !isLocaleRTL(locale) && <Mail size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Mail size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['email']['placeholder'][
                                        locale
                                    ]
                                }
                                width="100%"
                                value={email}
                                type={
                                    email == ''
                                        ? 'default'
                                        : isEmail(email)
                                        ? 'success'
                                        : 'error'
                                }
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value.trim().toLowerCase()
                                    )
                                }
                            />
                            {!email == '' && !isEmail(email) && (
                                <Text
                                    style={{
                                        direction: getLocaleDirection(locale),
                                    }}
                                    small
                                    type="error"
                                >
                                    {i18n['inputs']['email']['error'][locale]}
                                </Text>
                            )}
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['password']['placeholder'][
                                        locale
                                    ]
                                }
                                type={
                                    password == ''
                                        ? 'default'
                                        : password.length > 7
                                        ? 'success'
                                        : 'error'
                                }
                                width="100%"
                                mt={1}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value.trim())
                                }
                            />
                            {!password == '' && password.length < 8 && (
                                <Text small type="error">
                                    {
                                        i18n['inputs']['password']['error'][
                                            locale
                                        ]
                                    }
                                </Text>
                            )}
                            <Input.Password
                                label={
                                    !isLocaleRTL(locale) && <Lock size={16} />
                                }
                                labelRight={
                                    isLocaleRTL(locale) && <Lock size={16} />
                                }
                                placeholder={
                                    i18n['inputs']['confirmPassword'][
                                        'placeholder'
                                    ][locale]
                                }
                                type={
                                    confirmPassword == ''
                                        ? 'default'
                                        : confirmPassword.length > 7 &&
                                          confirmPassword == password
                                        ? 'success'
                                        : 'error'
                                }
                                width="100%"
                                mt={1}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value.trim())
                                }}
                            />
                            {!confirmPassword == '' &&
                                confirmPassword.length < 8 && (
                                    <Text small type="error">
                                        {
                                            i18n['inputs']['confirmPassword'][
                                                'error'
                                            ][locale]
                                        }{' '}
                                    </Text>
                                )}
                            {!confirmPassword == '' &&
                                confirmPassword != password && (
                                    <Text small type="error">
                                        {
                                            i18n['inputs']['password']['error'][
                                                locale
                                            ]
                                        }
                                    </Text>
                                )}
                            <Button
                                loading={loading}
                                disabled={
                                    !email ||
                                    !password ||
                                    confirmPassword != password ||
                                    !isEmail(email) ||
                                    password.length < 8 ||
                                    confirmPassword.length < 8
                                }
                                width="100%"
                                mt={1}
                                type="secondary"
                                onClick={onRegister}
                                icon={<UserPlus />}
                            >
                                {i18n['buttons']['register'][locale]}
                            </Button>
                        </Collapse>
                    </Collapse.Group>
                    <Divider className="AccentDivider" mt={1} mb={3}>
                        /
                    </Divider>
                    <a
                        href={getGoogleURL(
                            process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
                            process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID
                        )}
                    >
                        <Button
                            icon={<GoogleIcon />}
                            type="secondary"
                            width="100%"
                            mt={0.8}
                        >
                            {i18n['buttons']['google']['active'][locale]}
                        </Button>
                    </a>
                </Card>
            </Grid>
        </Grid.Container>
    )
}
