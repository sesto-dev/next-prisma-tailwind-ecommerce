import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useToasts } from '@geist-ui/core'

import { Layout } from 'aryana'

import { useAuth } from '../../state/Auth'
import getEssentials from '../../helpers/getEssentials'

export default function () {
    const { locale = getEssentials['config']['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const folio = getEssentials['i18n']['pages']['unsubcribe']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [loading, setLoading] = useState(false)

    return (
        <>
            <Layout
                essentials={getEssentials}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
                metaDescription={description}
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
