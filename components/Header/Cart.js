import Link from 'next/link'
import { Button, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { CartIcon } from '../SVGs'
import { isLocaleRTL } from '../../helpers/RTL'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const { locale = config.defaultLocale, locales } = useRouter()

    return (
        <Link href="/cart">
            <Button
                icon={<CartIcon />}
                aria-label="Toggle Dark mode"
                ml={!isLocaleRTL(locale) && 0.6}
                px={1}
                scale={0.7}
                auto
                onClick={() => {}}
            />
        </Link>
    )
}
