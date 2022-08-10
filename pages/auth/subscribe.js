import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { unsubscribeHandler } from '../../helpers/handlers'

import config from '../../main.config'

export default function () {
    const theme = useTheme()
    const { locale } = useRouter()
    const { setToast } = useToasts()

    const title = i18n['title'][locale]
    const description = i18n['description'][locale]

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
                        {title}
                    </Button>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

const i18n = {
    title: {
        en: 'Subscribe',
        ja: '申し込む',
    },
    description: {
        en: 'For security purposes, you should be logged-in in order to subscribe.',
        ja: 'セキュリティ上の理由から、購読するにはログインする必要があります。',
    },
}
