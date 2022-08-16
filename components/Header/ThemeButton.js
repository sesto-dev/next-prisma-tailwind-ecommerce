import { Grid, Button, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

import { isLocaleRTL } from '../../helpers/RTL'
import { DarkModeIcon, LightModeIcon } from '../SVGs'

export default function ({ config, useThemeProvider }) {
    const themeProvider = useThemeProvider()
    const { locale = config.defaultLocale, locales } = useRouter()
    const theme = useTheme()

    return (
        <Grid.Container>
            <Grid xs={0} sm={24}>
                <Button
                    icon={
                        theme.type === 'dark' ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )
                    }
                    aria-label="Toggle Theme"
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
            </Grid>
            <Grid xs={24} sm={0}>
                <Button
                    icon={
                        theme.type === 'dark' ? (
                            <LightModeIcon />
                        ) : (
                            <DarkModeIcon />
                        )
                    }
                    aria-label="Toggle Theme"
                    width="100%"
                    mb={1}
                    onClick={() =>
                        themeProvider.setLocalTheme(
                            theme.type === 'dark' ? 'light' : 'dark'
                        )
                    }
                >
                    {theme.type === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
            </Grid>
        </Grid.Container>
    )
}
