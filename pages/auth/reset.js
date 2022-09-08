import useState from 'react-usestateref'
import { Button, Grid, useToasts, Input, Text } from '@geist-ui/core'

import { isLocaleRTL, forgotHandler, resetHandler, isEmail } from 'aryana'
import essentials from '../../helpers/getEssentials'
import { useEffect } from 'react'

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
        useMeta,
    } = essentials

    const router = useRouter()
    const { setMeta } = useMeta()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description } = i18n['pages']['reset']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    const [loading, setLoading, refLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    async function onForgot() {
        setLoading(true)

        const response = await axios.post(
            config.routes.backend.forgot,
            {
                email: refEmail.current,
            },
            config.axios.simple
        )

        forgotHandler({
            response,
            setLoading,
            setToast,
            setNextStage,
            toast: i18n['toasts']['forgot'][locale],
        })
    }

    async function onReset() {
        setLoading(true)

        const response = await axios.post(
            config.routes.backend.reset,
            {
                code: refCode.current,
                password: refPassword.current,
            },
            config.axios.simple
        )

        resetHandler({
            response,
            setLoading,
            setToast,
            router,
            toast: i18n['toasts']['forgot'][locale],
            redirect_uri: config.routes.frontend.login,
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
                        setEmail(e.target.value.trim().toLowerCase())
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
                        loading={refLoading.current}
                        disabled={
                            !refEmail.current || !isEmail(refEmail.current)
                        }
                        type="secondary"
                        onClick={onForgot}
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
                            i18n['inputs']['verificationCode']['label'][locale]
                        }
                        labelRight={
                            isLocaleRTL(locale) &&
                            i18n['inputs']['verificationCode']['label'][locale]
                        }
                        placeholder={
                            i18n['inputs']['verificationCode']['placeholder'][
                                locale
                            ]
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
                        loading={refLoading.current}
                        disabled={
                            !refCode.current ||
                            !refPassword.current ||
                            refPassword.current.length < 8
                        }
                        type="secondary"
                        onClick={onReset}
                    >
                        <b>{i18n['buttons']['submit'][locale]}</b>
                    </Button>
                )}
            </Grid>
        </Grid.Container>
    )
}
