import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { unsubscribeHandler } from '../../helpers/handlers'
import { isLocaleRTL } from '../../helpers/RTL'
import { useIsAuthenticated } from '../../state/Auth'

import config from '../../main.config'
import i18n from '../../i18n.content'

export default function () {
    const theme = useTheme()
    const { locale = 'en' } = useRouter()
    const { setToast } = useToasts()
    const isAuthenticated = useIsAuthenticated()

    const page = i18n['auth']['subscribe']
    const title = page['title'][locale]
    const description = page['description'][locale]

    const [loading, setLoading] = useState(false)

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
                <Grid.Container gap={1} className="avanti">
                    <Grid xs={24}>
                        <Button
                            disabled={!isAuthenticated}
                            loading={loading}
                            type="secondary"
                            onClick={(e) =>
                                unsubscribeHandler(config, setLoading, setToast)
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
