import { getLocaleDirection } from 'aryana'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

export default function () {
    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['contact']

    return (
        <Grid.Container gap={1}>
            <Grid xs={24}>
                <Card
                    style={{
                        backgroundColor: theme.palette.accents_1,
                    }}
                    width="100%"
                >
                    <Text
                        style={{
                            direction: getLocaleDirection(locale),
                        }}
                    >
                        {title[locale]}
                    </Text>
                </Card>
            </Grid>
        </Grid.Container>
    )
}
