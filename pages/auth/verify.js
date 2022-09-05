import { useEffect } from 'react'
import useState from 'react-usestateref'
import { Button, Grid, useToasts, Input } from '@geist-ui/core'
import { isLocaleRTL, verifyHandler } from 'aryana'

import essentials from '../../helpers/getEssentials'

export default function () {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        Link,
        Head,
        useRouter,
        axios,
        useMeta,
    } = essentials

    const { setMeta } = useMeta()
    const { setToast } = useToasts()
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()

    const { title, description } = i18n['pages']['verify']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
            large: title[locale],
            small: description[locale],
        })
    }, [locale])

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

    async function attemptVerify() {
        setLoading(true)

        console.log(refCode.current)

        const response = await axios.post(
            config.backend.routes.verify,
            {
                code: refCode.current,
            },
            config.backend.axios.simple
        )

        console.log(response)

        verifyHandler({
            response,
            setLoading,
            setToast,
            router,
            toast: i18n['toasts']['verify'][locale],
            redirect_uri: config.routes.frontend.user,
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24}>
                <Input
                    label={
                        !isLocaleRTL(locale) &&
                        i18n['inputs']['code']['label'][locale]
                    }
                    labelRight={
                        isLocaleRTL(locale) &&
                        i18n['inputs']['code']['label'][locale]
                    }
                    placeholder={i18n['inputs']['code']['placeholder'][locale]}
                    width="220pt"
                    value={refCode.current}
                    type="secondary"
                    onChange={(e) => {
                        setCode(e.target.value.trim())
                    }}
                />
            </Grid>
            <Grid xs={24}>
                <Button
                    loading={loading}
                    disabled={!refCode.current}
                    type="secondary"
                    onClick={attemptVerify}
                >
                    <b>{i18n['buttons']['submit'][locale]}</b>
                </Button>
            </Grid>
        </Grid.Container>
    )
}
