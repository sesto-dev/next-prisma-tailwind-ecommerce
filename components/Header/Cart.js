import Link from 'next/link'
import { Grid, Button, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { CartIcon } from '../SVGs'
import { isLocaleRTL } from '../../helpers/RTL'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const { locale = config.defaultLocale, locales } = useRouter()

    return (
        <Grid.Container>
            <Grid xs={0} sm={24}>
                <Link href="/cart">
                    <Button
                        icon={<CartIcon />}
                        aria-label="Shopping Cart"
                        ml={!isLocaleRTL(locale) && 0.6}
                        scale={0.7}
                        auto
                    />
                </Link>
            </Grid>
            <Grid xs={24} sm={0}>
                <Link href="/cart">
                    <Button
                        aria-label="Shopping Cart"
                        mb={1}
                        width="100%"
                        onClick={() => {}}
                    >
                        <b>CART</b>
                    </Button>
                </Link>
            </Grid>
        </Grid.Container>
    )
}
