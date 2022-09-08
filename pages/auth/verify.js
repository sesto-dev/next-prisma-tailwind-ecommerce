import { useEffect, useState } from 'react'
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
    const [code, setCode] = useState('')

    async function onVerify() {
        setLoading(true)

        const response = await axios.post(
            config.routes.backend.verify,
            {
                code,
            },
            config.axios.simple
        )

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
                    width="220pt"
                    value={code}
                    type="secondary"
                    onChange={(e) => {
                        setCode(e.target.value.trim())
                    }}
                />
            </Grid>
            <Grid xs={24}>
                <Button
                    loading={loading}
                    disabled={!code}
                    type="secondary"
                    onClick={onVerify}
                >
                    <b>{i18n['buttons']['submit'][locale]}</b>
                </Button>
            </Grid>
        </Grid.Container>
    )
}
