import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { verifyHandler } from '../../handlers/AuthHandlers'
import { isLocaleRTL, getLocaleDirection } from '../../helpers/RTL'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['auth']['verify']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

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
                        <Input
                            label={
                                !isLocaleRTL(locale) &&
                                i18n['inputs']['code']['label'][locale]
                            }
                            labelRight={
                                isLocaleRTL(locale) &&
                                i18n['inputs']['code']['label'][locale]
                            }
                            placeholder={
                                i18n['inputs']['code']['placeholder'][locale]
                            }
                            width="220pt"
                            value={code}
                            type="secondary"
                            onChange={(e) => {
                                setCode(e.target.value.trim())
                            }}
                        />
                    </Grid>
                    <Grid xs={24}>
                        <Button
                            loading={loading}
                            disabled={!refCode.current}
                            type="secondary"
                            onClick={(e) =>
                                verifyHandler({
                                    config,
                                    setLoading,
                                    setToast,
                                    router,
                                    refCode,
                                    toast: i18n['toasts']['verify'][locale],
                                })
                            }
                        >
                            <b>{i18n['buttons']['submit'][locale]}</b>
                        </Button>
                    </Grid>
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    input::placeholder {
                        text-align: ${isLocaleRTL(locale) ? 'right' : 'left'};
                        direction: ${getLocaleDirection(locale)} !important;
                    }
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
