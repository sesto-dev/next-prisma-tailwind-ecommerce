import { Grid, ButtonGroup, Button, useTheme } from '@geist-ui/core'
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
                <ButtonGroup mx={0} mb={3} width="100%">
                    <Button
                        disabled={theme.type === 'dark'}
                        icon={<DarkModeIcon />}
                        aria-label="Toggle Dark Mode"
                        width="100%"
                        onClick={() => themeProvider.setLocalTheme('dark')}
                    />
                    <Button
                        disabled={theme.type === 'light'}
                        icon={<LightModeIcon />}
                        aria-label="Toggle Light Mode"
                        width="100%"
                        onClick={() => themeProvider.setLocalTheme('light')}
                    />
                </ButtonGroup>
            </Grid>
            <style jsx global>
                {`
                    .btn-group > button {
                        width: 100% !important;
                    }
                `}
            </style>
        </Grid.Container>
    )
}
