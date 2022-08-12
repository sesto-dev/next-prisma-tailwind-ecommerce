import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Description,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
} from '@geist-ui/core'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'
import withAuth from '../HOCs/withAuth'
import { handleAccountData } from '../helpers/handlers'

import config from '../main.config'
import i18n from '../i18n.content'

export default withAuth(function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const page = i18n['root']['account']
    const title = page['title'][locale]
    const description = page['description'][locale]

    const [account, setAccount] = useState({})

    async function resolve() {
        const response = await axios.get(config.backend.routes.account)
        handleAccountData(
            response,
            router,
            setAccount,
            setToast,
            i18n['toasts']['noDataReceived'][locale],
            i18n['toasts']['notVerified'][locale]
        )
    }

    useEffect(() => {
        resolve()
    }, [])

    return (
        <Layout
            config={config}
            i18n={i18n}
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        style={{
                            backgroundColor: `${theme.palette.accents_1}`,
                        }}
                        width="100%"
                    >
                        {account ? (
                            <Description
                                title="Email"
                                content={account.email}
                            />
                        ) : (
                            <Loading />
                        )}
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
})
