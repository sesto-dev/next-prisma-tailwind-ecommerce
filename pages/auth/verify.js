import useState from 'react-usestateref'
import { Button, Grid, useToasts, Input } from '@geist-ui/core'
import essentials from '../../helpers/getEssentials'

import { Layout, isLocaleRTL, verifyHandler } from 'aryana'

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

    const router = useRouter()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description } = i18n['pages']['verify']

    const [loading, setLoading] = useState(false)
    const [code, setCode, refCode] = useState('')

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
        </>
    )
}
