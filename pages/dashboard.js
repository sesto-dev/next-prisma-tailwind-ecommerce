import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { handleAccountData } from '../helpers/handlers/accountHandlers'
import { Text, Card, Grid, useTheme, useToasts, Loading } from '@geist-ui/core'

import Layout from '../components/Layout'
import { useThemeProvider } from '../state/Theme'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const [account, setAccount] = useState({})

    const folio = i18n['root']['dashboard']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

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
            useThemeProvider={useThemeProvider}
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
}
