import { getLocaleDirection } from 'aryana'
import { Text, Card, Grid, useTheme } from '@geist-ui/core'
import essentials from '../helpers/getEssentials'
import { useEffect } from 'react'

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
        useMeta,
    } = essentials

    const { setMeta } = useMeta()
    const theme = useTheme()
    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['contact']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

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
