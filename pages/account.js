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
import { useThemeProvider } from '../state/Theme'
import { handleAccountData } from '../helpers/handlers/accountHandlers'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['root']['account']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

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
}
