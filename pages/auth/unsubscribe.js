import { useState } from 'react'
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
    } = essentials

    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['unsubscribe']

    const [loading, setLoading] = useState(false)

    async function attemptUnsubscribe() {
        const response = await axios.post(config.backend.routes.unsubscribe)

        unsubscribeHandler({
            response,
            setLoading,
            setToast,
            toast: i18n['toasts']['unsubscribe'][locale],
            router,
            redirect_uri: '/',
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24}>
                <Button
                    disabled={!isAuthenticated}
                    loading={loading}
                    type="secondary"
                    onClick={attemptUnsubscribe}
                >
                    {title[locale]}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
