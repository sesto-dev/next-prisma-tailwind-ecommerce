import { useState } from 'react'
import { Button, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import config from '../../main.config'
import { unsubscribeHandler } from '../../helpers/handlers'

export default function () {
    const title = 'Unsubscribe'
    const description =
        'For security purposes, you should be logged-in in order to unsubscribe.'

    const theme = useTheme()
    const { setToast } = useToasts()

    const [loading, setLoading] = useState(false)

    return (
        <Layout
            config={config}
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Button
                        loading={loading}
                        type="secondary"
                        onClick={(e) =>
                            unsubscribeHandler(config, setLoading, setToast)
                        }
                    >
                        Unsubscribe
                    </Button>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
