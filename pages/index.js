import { Layout, getLocaleDirection } from 'aryana'
import { Grid, Card, Text, useTheme } from '@geist-ui/core'
import getEssentials from '../helpers/getEssentials'
import { useRouter } from 'next/router'
import { useAuth } from '../state/Auth'

export default function ({ auth }) {
    const theme = useTheme()
    const { locale = getEssentials['config']['defaultLocale'] } = useRouter()
    const { isAuthenticated, setLocalAuthentication } = useAuth()

    setLocalAuthentication(auth)

    const folio = getEssentials['i18n']['pages']['index']
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
                        width="100%"
                        style={{
                            backgroundColor: theme.palette.accents_1,
                        }}
                    >
                        <Text
                            type="secondary"
                            style={{
                                direction: getLocaleDirection(locale),
                            }}
                        >
                            {folio['content'][locale]}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { AJWT } = ctx.req.cookies

    return {
        props: { auth: AJWT ? true : false },
    }
}
