import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input } from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { verifyHandler } from '../../helpers/handlers'
import { isLocaleRTL } from '../../helpers/RTL'

import config from '../../main.config'
import i18n from '../../i18n.content'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = 'en' } = router
    const { setToast } = useToasts()

    const page = i18n['auth']['verify']
    const title = page['title'][locale]
    const description = page['description'][locale]

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

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
                            scale={0.9}
                            onChange={(e) => {
                                setCode(e.target.value.trim())
                            }}
                        />
                    </Grid>
                    <Grid xs={24}>
                        <Button
                            loading={loading}
                            disabled={!refCode.current}
                            scale={0.7}
                            type="secondary"
                            onClick={(e) =>
                                verifyHandler(
                                    config,
                                    setLoading,
                                    setToast,
                                    router,
                                    refCode,
                                    i18n['toasts']['verify'][locale]
                                )
                            }
                        >
                            <b>{i18n['buttons']['submit'][locale]}</b>
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
