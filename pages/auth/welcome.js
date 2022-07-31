import { Text, Card, Grid } from '@geist-ui/core'
import Layout from '../../components/Layout'

import { themePreference } from '../../state/Theme'
import config from '../../main.config'

export default function () {
    const title = 'Welcome'
    const description = 'Welcome Sample Page'

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
                        <Text>{description}</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
