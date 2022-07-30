import useState from 'react-usestateref'
import { Button, Grid, Input, Modal, Text, useTheme } from '@geist-ui/core'
import Link from 'next/link'
import axios from 'axios'

export default function Login({ config, sticky }) {
    const theme = useTheme()

    const [modalVisibility, setModalVisibility] = useState(false)
    const modalHandler = () => setModalVisibility(true)
    const closeHandler = (event) => {
        setModalVisibility(false)
    }

    const [failure, setFailure, refFailure] = useState(false)
    const [email, setEmail, refEmail] = useState('')

    const [password, setPassword, refPassword] = useState('')

    const loginHandler = async (e) => {
        e.preventDefault()

        const { data } = await axios.post(
            config.backend.routes.login,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.login
        )
        console.log(data)
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
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid xs={12}>
                                <Button ghost width="100%" type="secondary">
                                    Register
                                </Button>
                            </Grid>
                        </Grid.Container>
                        <Link href="/auth/forgot">
                            <a style={{ fontSize: '0.75rem' }}>
                                Forgot your password?
                            </a>
                        </Link>
                    </Modal.Content>
                </Modal>
            </>
            <style jsx global>
                {`
                    a {
                        color: ${theme.palette.accents_6}!important;
                    }
                    a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                `}
            </style>
        </>
    )
}
