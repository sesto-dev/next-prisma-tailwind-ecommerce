import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { handleAccountData } from '../helpers/handlers'
import { Text, Card, Grid, useTheme, useToasts, Loading } from '@geist-ui/core'

import Layout from '../components/Layout'
import withAuth from '../HOCs/withAuth'
import { themePreference } from '../state/Theme'
import config from '../main.config'

export default withAuth(function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const [account, setAccount] = useState({})

    const title = i18n['title'][locale]
    const description = i18n['description'][locale]

    async function resolve() {
        const response = await axios.get(config.backend.routes.account)
        handleAccountData(response, router, setAccount, setToast)
    }

    useEffect(() => {
        resolve()
    }, [])

    return (
        <Layout
            config={config}
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

const i18n = {
    title: {
        en: 'Dashboard',
        ja: '前板',
    },
    description: {
        en: 'Dashboard Sample Page',
        ja: 'ダッシュボードのサンプル ページ',
    },
}
