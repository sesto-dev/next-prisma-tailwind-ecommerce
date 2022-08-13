import { useRouter } from 'next/router'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'

import config from '../config/main.config'
import i18n from '../config/i18n.config'
import { isLocaleRTL, getLocaleDirection } from '../helpers/RTL'

export default function () {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()

    const page = i18n['root']['cart']
    const title = page['title'][locale]
    const description = page['description'][locale]

    return (
        <Layout
            config={config}
            i18n={i18n}
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
                        <Text
                            style={{
                                direction: getLocaleDirection(locale),
                            }}
                        >
                            {title}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
