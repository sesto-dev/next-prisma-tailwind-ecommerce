import { useContext } from 'react'
import { Text, Card, Grid } from '@geist-ui/core'
import Layout from '../components/Layout'

import { themePreference } from '../state/Theme'
import config from '../main.config'

export default function Account() {
    const title = 'Account'
    const description = 'Account Sample Page'

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
                    <Card width="100%">
                        <Text>{user.email}</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
