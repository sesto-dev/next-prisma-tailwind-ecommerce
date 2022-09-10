import { useEffect, useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'

import { fetchHandler } from 'aryana'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'
import { useAuth } from '../../state/Auth'

export default function () {
    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['unsubscribe']

    const [loading, setLoading] = useState(false)

    async function onUnsubscribe() {
        let response
        setLoading(true)

        try {
            response = await axios.post(config.routes.backend.unsubscribe)
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            success_toast: i18n['toasts']['unsubscribe'][locale],
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
                    onClick={onUnsubscribe}
                >
                    {title[locale]}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
