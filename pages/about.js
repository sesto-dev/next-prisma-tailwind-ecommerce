import { useRouter } from 'next/router'
import { Grid, Card, useTheme, Text, Spacer, Code } from '@geist-ui/core'

import { themePreference } from '../state/Theme'
import Layout from '../components/Layout'

import config from '../main.config'
import i18n from '../i18n'
import isLocaleRTL from '../helpers/isLocaleRTL'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()

    const page = i18n['root']['about']
    const title = page['title'][locale]
    const description = page['description'][locale]

    const links = ['http://github.com/accretence/create-next-dashboard']

    return (
        <>
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
                            shadow
                            padding={2}
                            width="100%"
                        >
                            {page && (
                                <>
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: '0.9rem',
                                            direction: isLocaleRTL(locale)
                                                ? 'rtl'
                                                : 'ltr',
                                        }}
                                    >
                                        {page['content'][locale]}
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
                            )}
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
