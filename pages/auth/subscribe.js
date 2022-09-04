import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Grid, useToasts } from '@geist-ui/core'
import getEssentials from '../../helpers/getEssentials'

import { Layout, subscribeHandler } from 'aryana'
import { useAuth } from '../../state/Auth'

export default function () {
    const { locale = getEssentials['config']['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()
    const { isAuthenticated } = useAuth()

    const folio = getEssentials['i18n']['pages']['subscribe']
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
