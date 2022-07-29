import { Text, Card, Grid } from '@geist-ui/core'
import Layout from '../components/Layout'

import { themePreference } from '../state/Context'
import config from '../main.config'

const Pricing = () => {
    const title = 'Pricing'
    const description = 'Pricing Sample Page'

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
                        <Text>Pricing</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export default Pricing
