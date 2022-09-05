import useState from 'react-usestateref'
import { Button, Grid, useToasts, Input, Text } from '@geist-ui/core'

import { isLocaleRTL, forgotHandler, resetHandler, isEmail } from 'aryana'
import essentials from '../../helpers/getEssentials'

export default function () {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
    } = essentials

    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description } = i18n['pages']['reset']

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    async function attemptForgot() {
        const response = await axios.post(
            config.backend.routes.forgot,
            {
                email: refEmail.current,
            },
            config.backend.axios.simple
        )

        forgotHandler({
            response,
            setLoading,
            setToast,
            setNextStage,
            toast: i18n['toasts']['forgot'][locale],
        })
    }

    async function attemptReset() {
        const response = await axios.post(
            config.backend.routes.reset,
            {
                code: refCode.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        resetHandler({
            response,
            setLoading,
            setToast,
            router,
            toast: i18n['toasts']['forgot'][locale],
            redirect_uri: config['routes']['frontend']['login'],
        })
    }

    return (
        <Grid.Container gap={0.5} className="avanti">
            <Grid xs={24}>
                <Input
                    label={
                        !isLocaleRTL(locale) &&
                        i18n['inputs']['email']['label'][locale]
                    }
                    labelRight={
                        isLocaleRTL(locale) &&
                        i18n['inputs']['email']['label'][locale]
                    }
                    placeholder={i18n['inputs']['email']['placeholder'][locale]}
                    width="400pt"
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
            </Grid>
            <Grid xs={24}>
                {!nextStage &&
                    refEmail.current != '' &&
                    !isEmail(refEmail.current) && (
                        <Text small type="error">
                            {i18n['inputs']['email']['error'][locale]}
                        </Text>
                    )}
            </Grid>
            <Grid xs={24}>
                {!nextStage && (
                    <Button
                        loading={loading}
                        disabled={
                            !refEmail.current || !isEmail(refEmail.current)
                        }
                        type="secondary"
                        onClick={attemptForgot}
                    >
                        <b>{i18n['buttons']['submit'][locale]}</b>
                    </Button>
                )}
            </Grid>
            <Grid xs={24}>
                {nextStage && (
                    <Input
                        label={
                            !isLocaleRTL(locale) &&
                            i18n['inputs']['code']['label'][locale]
                        }
                        labelRight={
                            isLocaleRTL(locale) &&
                            i18n['inputs']['code']['label'][locale]
                        }
                        placeholder={
                            i18n['inputs']['code']['placeholder'][locale]
                        }
                        width="100%"
                        type="secondary"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value.trim())
                        }}
                    />
                )}
            </Grid>
            <Grid xs={24}>
                {nextStage && (
                    <Input
                        label={
                            !isLocaleRTL(locale) &&
                            i18n['inputs']['password']['label'][locale]
                        }
                        labelRight={
                            isLocaleRTL(locale) &&
                            i18n['inputs']['password']['label'][locale]
                        }
                        placeholder={
                            i18n['inputs']['password']['placeholder'][locale]
                        }
                        width="100%"
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
                )}
            </Grid>
            <Grid xs={24}>
                {nextStage &&
                    !refPassword.current == '' &&
                    refPassword.current.length < 8 && (
                        <Text small type="error">
                            {i18n['inputs']['password']['error'][locale]}
                        </Text>
                    )}
            </Grid>
            <Grid xs={24}>
                {nextStage && (
                    <Button
                        loading={loading}
                        disabled={
                            !refCode.current ||
                            !refPassword.current ||
                            refPassword.current.length < 8
                        }
                        type="secondary"
                        onClick={attemptReset}
                    >
                        <b>{i18n['buttons']['submit'][locale]}</b>
                    </Button>
                )}
            </Grid>
        </Grid.Container>
    )
}
