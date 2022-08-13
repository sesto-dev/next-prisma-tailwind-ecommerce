import { Button, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { isLocaleRTL } from '../../helpers/RTL'
import { DarkModeIcon, LightModeIcon } from '../SVGs'

export default function ({ config, themePreference }) {
    const prefers = themePreference()
    const { locale = config.defaultLocale, locales } = useRouter()
    const theme = useTheme()

    return (
        <Button
            icon={theme.type === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            aria-label="Toggle Dark mode"
            ml={isLocaleRTL(locale) && 0.6}
            px={1}
            scale={0.7}
            auto
            onClick={() =>
                prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')
            }
        />
    )
}
