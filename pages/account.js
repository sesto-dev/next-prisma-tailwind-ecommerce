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
import config from '../main.config'
import withAuth from '../HOCs/withAuth'
import { handleAccountData } from '../helpers/handlers'

export default withAuth(function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const title = i18n['title'][locale]
    const description = i18n['description'][locale]

    const [account, setAccount] = useState({})

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

const i18n = {
    title: {
        en: 'Account',
        ja: '口座',
    },
    description: {
        en: 'Account Sample Page',
        ja: 'アカウントのサンプルページ',
    },
}
