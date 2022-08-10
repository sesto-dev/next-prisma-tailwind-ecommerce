import { useRouter } from 'next/router'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'

import config from '../main.config'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()

    const title = i18n['title'][locale]
    const description = i18n['description'][locale]

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
                        <Text>{title}</Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

const i18n = {
    title: {
        en: 'Pricing',
        ja: '価格',
    },
    description: {
        en: 'Pricing Sample Page',
        ja: '料金サンプルページ',
    },
}
