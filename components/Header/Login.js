import useState from 'react-usestateref'
import {
    useToasts,
    Description,
    Button,
    Grid,
    Input,
    Modal,
    Text,
    useTheme,
} from '@geist-ui/core'
import Link from 'next/link'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../state/Context'
import { LoginIcon, RegisterIcon } from '../SVGs'
import { useRouter } from 'next/router'

export default function Login({ config, sticky }) {
    const theme = useTheme()
    const router = useRouter()

    const { user, setUser } = useContext(UserContext)

    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const [failure, setFailure, refFailure] = useState(false)
    const [email, setEmail, refEmail] = useState('')

    const [password, setPassword, refPassword] = useState('')

    const { setToast } = useToasts()

    const loginHandler = async (e) => {
        let response

        try {
            response = await axios.post(
                config.backend.routes.login,
                {
                    email: refEmail.current,
                    password: refPassword.current,
                },
                config.backend.axios.simple
            )
        } catch (error) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={error.message}
                    />
                ),
                delay: 5000,
            })
        }

        if (response && response.status && response.status == 200) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={'✓ Login Successful'}
                    />
                ),
                delay: 5000,
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
            router.replace('/dashboard')
        }
    }

    const registerHandler = async (e) => {
        let response

        try {
            response = await axios.post(
                config.backend.routes.register,
                {
                    email: refEmail.current,
                    password: refPassword.current,
                },
                config.backend.axios.simple
            )
        } catch (error) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={error.message}
                    />
                ),
                delay: 5000,
            })
        }

        if (response && response.status && response.status == 201) {
            localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
            router.replace('/auth/welcome')
        }
    }

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
                    ml={0.3}
                    px={1.4}
                    auto
                    scale={0.6}
                    type="secondary"
                    icon={<LoginIcon />}
                    onClick={modalHandler}
                >
                    <Text b>LOGIN</Text>
                </Button>
                <Modal
                    py={0.2}
                    visible={modalVisibility}
                    onClose={closeHandler}
                >
                    <Modal.Content>
                        <Input
                            label="email"
                            placeholder="Input your email."
                            width="100%"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <Input.Password
                            label="password"
                            placeholder="Input your password."
                            width="100%"
                            my={1}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <Grid.Container mb={0.2} gap={1}>
                            <Grid xs={12}>
                                <Button
                                    width="100%"
                                    type="secondary"
                                    onClick={loginHandler}
                                    icon={<LoginIcon />}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid xs={12}>
                                <Button
                                    ghost
                                    width="100%"
                                    type="secondary"
                                    onClick={registerHandler}
                                    icon={<RegisterIcon />}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid.Container>
                        <Link href="/auth/forgot">
                            <a className="Peculiar">Forgot your password?</a>
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
