import { Text, Card, Grid, useTheme } from '@geist-ui/core'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'
import config from '../main.config'

export default function () {
    const title = 'Pricing'
    const description = 'Pricing Sample Page'

    const theme = useTheme()

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
                        <Text>Pricing</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
