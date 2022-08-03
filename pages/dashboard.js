import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { handleAccountData } from '../helpers/handlers'
import { Text, Card, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../components/Layout'
import withAuth from '../HOCs/withAuth'
import { themePreference } from '../state/Theme'
import config from '../main.config'

export default withAuth(function () {
    const title = 'Dashboard'
    const description = 'Dashboard Sample Page'

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

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
                        <Text>Dashboard</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
})
