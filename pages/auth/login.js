import useState from 'react-usestateref'
import { useRouter } from 'next/router'
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
import getEssentials from '../../helpers/getEssentials'

import {
    Layout,
    isLocaleRTL,
    loginHandler,
    registerHandler,
    getLocaleDirection,
    getGoogleURL,
    GoogleIcon,
    isEmail,
} from 'aryana'
import { Lock, Mail, LogIn, UserPlus } from '@geist-ui/icons'
import Link from 'next/link'
import axios from 'axios'
import { useAuth } from '../../state/Auth'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = getEssentials['config']['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const folio = getEssentials['i18n']['pages']['login']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [email, setEmail, refEmail] = useState('')
    const [password, setPassword, refPassword] = useState('')
    const [confirmPassword, setConfirmPassword, refConfirmPassword] =
        useState('')
    const [loading, setLoading, refLoading] = useState(false)

    const { i18n } = getEssentials

    const {
        buttons,
        components: { header },
    } = i18n

    async function attemptLogin() {
        const response = await axios.post(
            getEssentials.config.backend.routes.login,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            getEssentials.config.backend.axios.simple
        )

        loginHandler({
            response,
            setLoading,
            setToast,
            setLocalAuthentication,
            router,
            toast: getEssentials['i18n']['toasts']['login'][locale],
        })
    }

    async function attemptRegister() {
        const response = await axios.post(
            getEssentials.config.backend.routes.register,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            getEssentials.config.backend.axios.simple
        )

        registerHandler({
            response,
            setLoading,
            setToast,
            setLocalAuthentication,
            router,
        })
    }

    return (
        <>
            <Layout
                essentials={getEssentials}
                metaTitle={title}
                metaDescription={description}
            >
                <Grid.Container gap={1} className="avanti">
                    <Grid xs={24}>
                        <Card
                            width="600pt"
                            style={{ backgroundColor: theme.palette.accents_1 }}
                        >
                            <Card.Body>
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
                                                {
                                                    header['modal']['login'][
                                                        'title'
                                                    ][locale]
                                                }
                                            </Text>
                                        }
                                        subtitle={
                                            <Text small>
                                                {
                                                    header['modal']['login'][
                                                        'subtitle'
                                                    ][locale]
                                                }
                                            </Text>
                                        }
                                    >
                                        <Input
                                            label={
                                                !isLocaleRTL(locale) && (
                                                    <Mail size={16} />
                                                )
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) && (
                                                    <Mail size={16} />
                                                )
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
                                                !isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
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
                                                    : refPassword.current
                                                          .length > 7
                                                    ? 'default'
                                                    : 'error'
                                            }
                                            onChange={(e) => {
                                                setPassword(
                                                    e.target.value.trim()
                                                )
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
                                            onClick={(e) => attemptLogin()}
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
                                                {
                                                    header['modal']['register'][
                                                        'title'
                                                    ][locale]
                                                }
                                            </Text>
                                        }
                                        subtitle={
                                            <Text small>
                                                {
                                                    header['modal']['register'][
                                                        'subtitle'
                                                    ][locale]
                                                }
                                            </Text>
                                        }
                                    >
                                        <Input
                                            label={
                                                !isLocaleRTL(locale) && (
                                                    <Mail size={16} />
                                                )
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) && (
                                                    <Mail size={16} />
                                                )
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
                                                !isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
                                            }
                                            placeholder={
                                                i18n['inputs']['password'][
                                                    'placeholder'
                                                ][locale]
                                            }
                                            type={
                                                refPassword.current == ''
                                                    ? 'default'
                                                    : refPassword.current
                                                          .length > 7
                                                    ? 'success'
                                                    : 'error'
                                            }
                                            width="100%"
                                            mt={1}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(
                                                    e.target.value.trim()
                                                )
                                            }}
                                        />
                                        {!refPassword.current == '' &&
                                            refPassword.current.length < 8 && (
                                                <Text small type="error">
                                                    {
                                                        i18n['inputs'][
                                                            'password'
                                                        ]['error'][locale]
                                                    }
                                                </Text>
                                            )}
                                        <Input.Password
                                            label={
                                                !isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) && (
                                                    <Lock size={16} />
                                                )
                                            }
                                            placeholder={
                                                i18n['inputs'][
                                                    'confirmPassword'
                                                ]['placeholder'][locale]
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
                                                        i18n['inputs'][
                                                            'password'
                                                        ]['error'][locale]
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
                                                refPassword.current.length <
                                                    8 ||
                                                refConfirmPassword.current
                                                    .length < 8
                                            }
                                            width="100%"
                                            mt={1}
                                            type="secondary"
                                            onClick={(e) =>
                                                registerHandler({
                                                    axios,
                                                    config,
                                                    refEmail,
                                                    refPassword,
                                                    setLoading,
                                                    setToast,
                                                    setLocalAuthentication,
                                                    router,
                                                })
                                            }
                                            icon={<UserPlus />}
                                        >
                                            {buttons['register'][locale]}
                                        </Button>
                                    </Collapse>
                                </Collapse.Group>
                                <Divider mt={1} mb={3}>
                                    /
                                </Divider>
                                <a href={getGoogleURL()}>
                                    <Button
                                        icon={<GoogleIcon />}
                                        type="secondary"
                                        width="100%"
                                        mt={0.8}
                                        onClick={() => {}}
                                    >
                                        {buttons['google']['active'][locale]}
                                    </Button>
                                </a>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
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
