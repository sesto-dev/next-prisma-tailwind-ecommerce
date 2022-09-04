import { useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'

import { Layout } from 'aryana'

import essentials from '../../helpers/getEssentials'

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

    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const { title, description } = i18n['pages']['unsubcribe']

    const [loading, setLoading] = useState(false)

    return (
        <>
            <Layout
                essentials={essentials}
                crownLarge={title[locale]}
                crownSmall={description[locale]}
                metaTitle={title[locale]}
                metaDescription={description[locale]}
            >
                <Grid.Container gap={1} className="avanti">
                    <Grid xs={24}>
                        <Button
                            disabled={!isAuthenticated}
                            loading={loading}
                            type="secondary"
                            onClick={(e) =>
                                unsubscribeHandler(
                                    config,
                                    setLoading,
                                    setToast,
                                    i18n['toasts']['unsubscribe'][locale]
                                )
                            }
                        >
                            {title}
                        </Button>
                    </Grid>
                </Grid.Container>
            </Layout>
        </>
    )
}
