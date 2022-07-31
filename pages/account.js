import { useToasts, Description, Text, Card, Grid } from '@geist-ui/core'
import Layout from '../components/Layout'

import { themePreference } from '../state/Theme'
import config from '../main.config'
import withAuth from '../HOCs/withAuth'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default withAuth(function () {
    const title = 'Account'
    const description = 'Account Sample Page'
    const router = useRouter()
    const { setToast } = useToasts()
    const [account, setAccount] = useState({})

    const fetch = async (e) => {
        const { data, error } = await axios.get(config.backend.routes.account)

        if (error) {
            setToast({
                text: (
                    <Description
                        title={new Date().toUTCString()}
                        content={{ error }}
                    />
                ),
                delay: 5000,
            })
        }

        if (!data || error) router.replace('/')

        setAccount(data)
    }

    useEffect(() => {
        fetch()
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
                    {account && (
                        <Card width="100%">
                            <Description
                                title="Email"
                                content={account.email}
                            />
                        </Card>
                    )}
                </Grid>
            </Grid.Container>
        </Layout>
    )
})
