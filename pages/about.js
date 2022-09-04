import { Grid, Card, useTheme, Text, Spacer, Code } from '@geist-ui/core'
import essentials from '../helpers/getEssentials'
import { Layout, getLocaleDirection } from 'aryana'

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
    const { title, description, content } = i18n['pages']['about']

    console.log({ title, description, locale })

    const links = ['http://github.com/accretence/create-next-dashboard']

    return (
        <>
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
                            shadow
                            padding={2}
                            width="100%"
                        >
                            {
                                <>
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: '0.9rem',
                                            direction:
                                                getLocaleDirection(locale),
                                        }}
                                    >
                                        {content[locale]}
                                    </Text>
                                    <Spacer />
                                    <Grid.Container gap={1}>
                                        {links.map((link) => (
                                            <Grid key={link} xs={24} md={12}>
                                                <a
                                                    style={{ width: '100%' }}
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Card hoverable>
                                                        <Text h4 my={0}>
                                                            🔗 GITHUB
                                                        </Text>
                                                        <Card.Footer>
                                                            <Code>{link}</Code>
                                                        </Card.Footer>
                                                    </Card>
                                                </a>
                                            </Grid>
                                        ))}
                                    </Grid.Container>
                                </>
                            }
                        </Card>
                    </Grid>
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    .content {
                        text-align: justify !important;
                    }
                `}
            </style>
        </>
    )
}
