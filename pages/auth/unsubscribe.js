import { useEffect, useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'

import { unsubscribeHandler } from 'aryana'

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
        useMeta,
    } = essentials

    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()
    const { setMeta } = useMeta()

    const { title, description } = i18n['pages']['unsubscribe']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    const [loading, setLoading] = useState(false)

    async function onUnsubscribe() {
        setLoading(true)

        const response = await axios.post(config.backend.routes.unsubscribe)

        unsubscribeHandler({
            response,
            setLoading,
            setToast,
            toast: i18n['toasts']['unsubscribe'][locale],
            router,
            redirect_uri: config.routes.frontend.root,
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24}>
                <Button
                    disabled={!isAuthenticated}
                    loading={loading}
                    type="secondary"
                    onClick={onUnsubscribe}
                >
                    {title[locale]}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
