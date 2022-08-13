import useState from 'react-usestateref'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    useToasts,
    Button,
    Tabs,
    Input,
    Modal,
    Text,
    useTheme,
} from '@geist-ui/core'

import { LoginIcon, RegisterIcon } from '../SVGs'
import { useAuth } from '../../state/Auth'
import {
    loginHandler,
    registerHandler,
} from '../../helpers/handlers/authHandlers'
import isEmail from '../../helpers/isEmail'
import { isLocaleRTL, getLocaleDirection } from '../../helpers/RTL'

export default function ({ config, i18n }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

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
                        <Modal.Content pt={0.2}>
                            <div className="Tabular">
                                <Tabs mb={0.7} initialValue="login">
                                    <Tabs.Item
                                        pl={0}
                                        mb={1}
                                        label={
                                            <>
                                                <LoginIcon />
                                                {buttons['login'][locale]}
                                            </>
                                        }
                                        value="login"
                                    >
                                        <Input
                                            label={
                                                !isLocaleRTL(locale) &&
                                                i18n['inputs']['email'][
                                                    'label'
                                                ][locale]
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) &&
                                                i18n['inputs']['email'][
                                                    'label'
                                                ][locale]
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
                                                i18n['inputs']['password'][
                                                    'label'
                                                ][locale]
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) &&
                                                i18n['inputs']['password'][
                                                    'label'
                                                ][locale]
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
                                            onClick={(e) =>
                                                loginHandler(
                                                    config,
                                                    setLoading,
                                                    setToast,
                                                    setAuthenticated,
                                                    router,
                                                    refEmail,
                                                    refPassword,
                                                    i18n['toasts']['login'][
                                                        locale
                                                    ]
                                                )
                                            }
                                            icon={<LoginIcon />}
                                        >
                                            {buttons['login'][locale]}
                                        </Button>
                                    </Tabs.Item>
                                    <Tabs.Item
                                        pl={0}
                                        mb={1}
                                        label={
                                            <>
                                                <RegisterIcon />
                                                {buttons['register'][locale]}
                                            </>
                                        }
                                        value="register"
                                    >
                                        <Input
                                            label={
                                                !isLocaleRTL(locale) &&
                                                i18n['inputs']['email'][
                                                    'label'
                                                ][locale]
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) &&
                                                i18n['inputs']['email'][
                                                    'label'
                                                ][locale]
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
                                                i18n['inputs']['password'][
                                                    'label'
                                                ][locale]
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) &&
                                                i18n['inputs']['password'][
                                                    'label'
                                                ][locale]
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
                                                !isLocaleRTL(locale) &&
                                                i18n['inputs'][
                                                    'confirmPassword'
                                                ]['label'][locale]
                                            }
                                            labelRight={
                                                isLocaleRTL(locale) &&
                                                i18n['inputs'][
                                                    'confirmPassword'
                                                ]['label'][locale]
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
                                                registerHandler(
                                                    config,
                                                    setLoading,
                                                    setToast,
                                                    setAuthenticated,
                                                    router,
                                                    refEmail,
                                                    refPassword
                                                )
                                            }
                                            icon={<RegisterIcon />}
                                        >
                                            {buttons['register'][locale]}
                                        </Button>
                                    </Tabs.Item>
                                </Tabs>
                            </div>
                            <Link href="/auth/reset">
                                <a className="Peculiar">
                                    <Text
                                        style={{
                                            direction:
                                                getLocaleDirection(locale),
                                            textAlign: isLocaleRTL(locale)
                                                ? 'right'
                                                : 'left',
                                        }}
                                    >
                                        {buttons['forgot'][locale]}
                                    </Text>
                                </a>
                            </Link>
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
                    .tabs > .content {
                        text-align: ${isLocaleRTL(locale)
                            ? 'right'
                            : 'left'}!important;
                    }
                    .Tabular > .tabs > header {
                        float: ${isLocaleRTL(locale) ? 'right' : 'left'};
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
