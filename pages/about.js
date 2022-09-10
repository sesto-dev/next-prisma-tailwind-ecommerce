import { Grid, Card, useTheme, Text, Spacer, Code } from '@geist-ui/core'
import { getLocaleDirection, Helmet } from 'aryana'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

import i18n from '../config/i18n.config'
import config from '../config/main.config'

export default function () {
    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description, content } = i18n['pages']['about']

    const links = ['http://github.com/accretence/create-next-dashboard']

    return (
        <Grid.Container gap={1}>
            <Helmet
                i18n={i18n}
                Head={Head}
                title={title[locale]}
                description={description[locale]}
            />
            <Grid xs={24}>
                <Card
                    style={{
                        backgroundColor: theme.palette.accents_1,
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
                                    direction: getLocaleDirection(locale),
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
    )
}
