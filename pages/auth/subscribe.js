import { useEffect, useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'
import essentials from '../../helpers/getEssentials'

import { fetchHandler } from 'aryana'

export default function () {
    const { config, i18n, useAuth, useRouter, Link, Head, axios, useMeta } =
        essentials

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

    async function onSubscribe() {
        let response
        setLoading(true)

        try {
            response = await axios.post(config.routes.backend.subscribe)
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            success_toast: i18n['toasts']['subscribe'][locale],
            success_redirect_uri: config.routes.frontend.root,
        })
    }

    return (
        <Grid.Container gap={1} className="avanti">
            <Grid xs={24}>
                <Button
                    disabled={!isAuthenticated}
                    loading={loading}
                    type="secondary"
                    onClick={onSubscribe}
                >
                    {title[locale]}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
