import { Layout, getLocaleDirection } from 'aryana'
import { useRouter } from 'next/router'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'
import getEssentials from '../helpers/getEssentials'

export default function () {
    const theme = useTheme()
    const { locale = getEssentials['config']['defaultLocale'] } = useRouter()
    const folio = i18n['pages']['contact']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    return (
        <Layout
            essentials={getEssentials}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
            metaDescription={description}
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
