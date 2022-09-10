import { useEffect, useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'

import { fetchHandler } from 'aryana'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../../state/Auth'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['subscribe']

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
