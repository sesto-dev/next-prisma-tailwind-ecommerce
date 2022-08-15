import useState from 'react-usestateref'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    useToasts,
    Collapse,
    Divider,
    Button,
    Tabs,
    Input,
    Modal,
    Text,
    useTheme,
} from '@geist-ui/core'

import { useAuth } from '../../state/Auth'
import { GoogleIcon, LoginIcon, RegisterIcon } from '../SVGs'
import {
    loginHandler,
    registerHandler,
} from '../../helpers/handlers/authHandlers'
import isEmail from '../../helpers/isEmail'
import { isLocaleRTL, getLocaleDirection } from '../../helpers/RTL'
import getGoogleURL from '../../helpers/getGoogleURL'

export default function ({ config, i18n }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()
    const { setLocalAuthentication } = useAuth()

    const buttons = i18n['buttons']

    const [email, setEmail, refEmail] = useState('')
    const [password, setPassword, refPassword] = useState('')
    const [confirmPassword, setConfirmPassword, refConfirmPassword] =
        useState('')
    const [loading, setLoading, refLoading] = useState(false)

    return (
        <>
            {config && i18n && buttons && (
                <>
                    <Button
                        ml={0.8}
                        px={1.4}
                        auto
                        scale={0.7}
                        type="secondary"
                        icon={<LoginIcon />}
                        onClick={modalHandler}
                    >
                        <Text b>{buttons['login'][locale].toUpperCase()}</Text>
                    </Button>
                    <Modal
                        py={0.2}
                        visible={modalVisibility}
                        onClose={closeHandler}
                    >
                        <Modal.Content pt={0.5} pb={1}>
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
                                        icon={<LoginIcon />}
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
                                        icon={<RegisterIcon />}
                                    >
                                        {buttons['register'][locale]}
                                    </Button>
                                </Collapse>
                            </Collapse.Group>
                            {/* <Divider mt={1} mb={3}>
                                OR
                            </Divider>
                            <a href={getGoogleURL()}>
                                <Button
                                    icon={<GoogleIcon />}
                                    type="secondary"
                                    width="100%"
                                    onClick={() => {}}
                                >
                                    Sign in with Google
                                </Button>
                            </a> */}
                        </Modal.Content>
                    </Modal>
                </>
            )}
            <style jsx global>
                {`
                    input::placeholder {
                        text-align: ${isLocaleRTL(locale) ? 'right' : 'left'};
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
