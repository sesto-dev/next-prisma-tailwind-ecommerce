import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { unsubscribeHandler } from '../../handlers/authHandlers'
import { isLocaleRTL } from '../../helpers/RTL'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()
    const { setToast } = useToasts()

    const title = i18n['auth']['unsubscribe']['title'][locale]
    const description = i18n['auth']['unsubscribe']['description'][locale]

    const [loading, setLoading] = useState(false)

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                useThemeProvider={useThemeProvider}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
                metaDescription={description}
            >
                <Grid.Container gap={1} className="avanti">
                    <Grid xs={24}>
                        <Button
                            disabled={!auth}
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
            <style jsx global>
                {`
                    .avanti > .item {
                        justify-content: ${isLocaleRTL(locale)
                            ? 'end'
                            : 'start'};
                    }
                `}
            </style>
        </>
    )
}
