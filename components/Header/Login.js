import useState from 'react-usestateref'
import {
    useToasts,
    Button,
    Grid,
    Input,
    Modal,
    Text,
    useTheme,
} from '@geist-ui/core'
import Link from 'next/link'
import { LoginIcon, RegisterIcon } from '../SVGs'
import { useRouter } from 'next/router'
import { useAuth } from '../../state/Auth'
import { loginHandler, registerHandler } from '../../helpers/handlers'

export default function ({ config, sticky }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const theme = useTheme()
    const router = useRouter()
    const { setAuthenticated } = useAuth()
    const { setToast } = useToasts()

    const [email, setEmail, refEmail] = useState('')
    const [password, setPassword, refPassword] = useState('')
    const [loading, setLoading, refLoading] = useState(false)

    if (config.authentication) {
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
                                        loading={loading}
                                        width="100%"
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
                                </Grid>
                                <Grid xs={12}>
                                    <Button
                                        loading={loading}
                                        ghost
                                        width="100%"
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
                                        Register
                                    </Button>
                                </Grid>
                            </Grid.Container>
                            <Link href="/auth/forgot">
                                <a className="Peculiar">
                                    Forgot your password?
                                </a>
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
}
