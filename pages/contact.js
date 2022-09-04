import { Layout, getLocaleDirection } from 'aryana'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'
import essentials from '../helpers/getEssentials'

export default function () {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
    } = essentials

    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['contact']
    console.log({ title, description, locale })

    return (
        <Layout
            essentials={essentials}
            crownLarge={title[locale]}
            crownSmall={description[locale]}
            metaTitle={title[locale]}
            metaDescription={description[locale]}
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
