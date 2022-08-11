import { useRouter } from 'next/router'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'

import Layout from '../components/Layout'
import { themePreference } from '../state/Theme'

import config from '../main.config'
import i18n from '../i18n'
import isLocaleRTL from '../helpers/isLocaleRTL'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()

    const page = i18n['root']['pricing']
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
                                direction: isLocaleRTL(locale) ? 'rtl' : 'ltr',
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
