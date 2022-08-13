import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { handleAccountData } from '../helpers/handlers'
import { Text, Card, Grid, useTheme, useToasts, Loading } from '@geist-ui/core'

import Layout from '../components/Layout'
import withAuth from '../HOCs/withAuth'
import { themePreference } from '../state/Theme'

import config from '../main.config'
import i18n from '../i18n.content'

export default withAuth(function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const [account, setAccount] = useState({})

    const page = i18n['root']['dashboard']
    const title = page['title'][locale]
    const description = page['description'][locale]

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
                        {account ? <Text>Dashboard</Text> : <Loading />}
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
})
