import { useState } from 'react'
import { Button, Grid, useToasts } from '@geist-ui/core'
import essentials from '../../helpers/getEssentials'

import { Layout, subscribeHandler } from 'aryana'

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

    const { title, description } = i18n['pages']['subscribe']

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
                                subscribeHandler(
                                    config,
                                    setLoading,
                                    setToast,
                                    i18n['toasts']['subscribe'][locale]
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
