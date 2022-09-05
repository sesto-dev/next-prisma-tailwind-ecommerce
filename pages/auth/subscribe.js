import { useEffect, useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'
import essentials from '../../helpers/getEssentials'

import { subscribeHandler } from 'aryana'

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

    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { setMeta } = useMeta()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['subscribe']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    const [loading, setLoading] = useState(false)

    async function attemptSubscribe() {
        setLoading(true)

        const response = await axios.post(config.backend.routes.subscribe)

        subscribeHandler({
            response,
            setLoading,
            setToast,
            toast: i18n['toasts']['subscribe'][locale],
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
                    onClick={attemptSubscribe}
                >
                    {title[locale]}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
