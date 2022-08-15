import { Button, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { isLocaleRTL } from '../../helpers/RTL'
import { DarkModeIcon, LightModeIcon } from '../SVGs'

export default function ({ config, useThemeProvider }) {
    const themeProvider = useThemeProvider()
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
                themeProvider.setLocalTheme(
                    theme.type === 'dark' ? 'light' : 'dark'
                )
            }
        />
    )
}
