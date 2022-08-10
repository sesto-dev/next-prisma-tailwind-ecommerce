import useState from 'react-usestateref'
import Link from 'next/link'
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
import { useRouter } from 'next/router'
import { useAuth } from '../../state/Auth'
import { loginHandler, registerHandler } from '../../helpers/handlers'
import isEmail from '../../helpers/isEmail'

export default function ({ config, sticky }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const theme = useTheme()
    const router = useRouter()
    const { locale } = router
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

    const [email, setEmail, refEmail] = useState('')
    const [password, setPassword, refPassword] = useState('')
    const [confirmPassword, setConfirmPassword, refConfirmPassword] =
        useState('')
    const [loading, setLoading, refLoading] = useState(false)

    return (
        <>
            <>
                <Button
                    style={
                        sticky
                            ? {
                                  top: '1.5px',
                              }
                            : {}
                    }
                    ml={0.5}
                    px={1.4}
                    auto
                    scale={0.7}
                    type="secondary"
                    icon={<LoginIcon />}
                    onClick={modalHandler}
                >
                    <Text b>{i18n['login'][locale].toUpperCase()}</Text>
                </Button>
                <Modal
                    py={0.2}
                    visible={modalVisibility}
                    onClose={closeHandler}
                >
                    <Modal.Content pt={0.2}>
                        <Tabs mb={0.7} initialValue="login">
                            <Tabs.Item
                                pl={0}
                                mb={1}
                                label={
                                    <>
                                        <LoginIcon />
                                        {i18n['login'][locale]}
                                    </>
                                }
                                value="login"
                            >
                                <Input
                                    label="email"
                                    placeholder="Input your email."
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
                                    label="password"
                                    placeholder="Input your password."
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
                                        loginHandler(
                                            config,
                                            setLoading,
                                            setToast,
                                            setAuthenticated,
                                            router,
                                            refEmail,
                                            refPassword
                                        )
                                    }
                                    icon={<LoginIcon />}
                                >
                                    Login
                                </Button>
                            </Tabs.Item>
                            <Tabs.Item
                                pl={0}
                                mb={1}
                                label={
                                    <>
                                        <RegisterIcon />
                                        {i18n['register'][locale]}
                                    </>
                                }
                                value="register"
                            >
                                <Input
                                    label="email"
                                    placeholder="Input your email."
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
                                        <Text small type="error">
                                            Incorrect email address!
                                        </Text>
                                    )}
                                <Input.Password
                                    label="password"
                                    placeholder="Input your password."
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
                                            Password must be at least 8
                                            characters!
                                        </Text>
                                    )}
                                <Input.Password
                                    label="password"
                                    placeholder="Confirm your password."
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
                                    refConfirmPassword.current.length < 8 && (
                                        <Text small type="error">
                                            Password must be at least 8
                                            characters!{' '}
                                        </Text>
                                    )}
                                {!refConfirmPassword.current == '' &&
                                    refConfirmPassword.current !=
                                        refPassword.current && (
                                        <Text small type="error">
                                            Passwords don't match!
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
                                        refConfirmPassword.current.length < 8
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
                                    {i18n['register'][locale]}
                                </Button>
                            </Tabs.Item>
                        </Tabs>
                        <Link href="/auth/reset">
                            <a className="Peculiar">{i18n['forgot'][locale]}</a>
                        </Link>
                    </Modal.Content>
                </Modal>
            </>
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

const i18n = {
    login: {
        en: 'Login',
        ja: 'ログインする',
    },
    register: {
        en: 'Register',
        ja: '登録',
    },
    forgot: {
        en: 'Forgot your password?',
        ja: 'パスワードをお忘れですか？',
    },
}
