import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input, Text } from '@geist-ui/core'

import isEmail from '../../helpers/isEmail'
import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { forgotHandler, resetHandler } from '../../helpers/handlers'

import config from '../../main.config'
import i18n from '../../i18n'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const page = i18n['auth']['reset']
    const title = page['title'][locale]
    const description = page['description'][locale]

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                themePreference={themePreference}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
            >
                <Grid.Container gap={1}>
                    <Grid xs={24} md={12}>
                        <div style={{ display: 'block' }}>
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
                            {!nextStage && (
                                <Button
                                    width="100%"
                                    mt={1}
                                    loading={loading}
                                    disabled={
                                        !refEmail.current ||
                                        !isEmail(refEmail.current)
                                    }
                                    type="secondary"
                                    onClick={(e) =>
                                        forgotHandler(
                                            config,
                                            refEmail,
                                            setLoading,
                                            setToast,
                                            setNextStage
                                        )
                                    }
                                >
                                    <b>SUBMIT EMAIL</b>
                                </Button>
                            )}
                            {nextStage && (
                                <>
                                    <Input
                                        width="100%"
                                        mt={1}
                                        label="code"
                                        placeholder="Input your verification code."
                                        type="secondary"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.trim())
                                        }}
                                    />
                                    <Input
                                        width="100%"
                                        mt={1}
                                        label="password"
                                        placeholder="Input your new password."
                                        type={
                                            refPassword.current == ''
                                                ? 'default'
                                                : refPassword.current.length > 7
                                                ? 'success'
                                                : 'error'
                                        }
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim())
                                        }}
                                    />
                                    <Button
                                        width="100%"
                                        mt={1}
                                        loading={loading}
                                        disabled={
                                            !refCode.current ||
                                            !refPassword.current ||
                                            refPassword.current.length < 8
                                        }
                                        type="secondary"
                                        onClick={(e) =>
                                            resetHandler(
                                                config,
                                                refCode,
                                                refPassword,
                                                setLoading,
                                                setToast,
                                                router
                                            )
                                        }
                                    >
                                        <b>SUBMIT NEW PASSWORD</b>
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid.Container>
            </Layout>
        </>
    )
}
