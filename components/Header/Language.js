import { Grid, ButtonDropdown, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'

export default function ({ config }) {
    const theme = useTheme()
    const router = useRouter()
    const {
        locale = config.defaultLocale,
        locales,
        pathname,
        asPath,
        query,
    } = router

    const changeLanguage = (loc) => {
        router.push({ pathname, query }, asPath, { locale: loc })
    }

    return (
        <>
            {locale && locales && (
                <Grid.Container>
                    <Grid xs={0} sm={24}>
                        <ButtonDropdown
                            className="MainDropdown"
                            scale={0.63}
                            auto
                        >
                            <ButtonDropdown.Item main>
                                <b>{locale.toUpperCase()}</b>
                            </ButtonDropdown.Item>
                            {locales.map((loc) => (
                                <ButtonDropdown.Item
                                    key={loc}
                                    onClick={() => changeLanguage(loc)}
                                >
                                    <b>{loc.toUpperCase()}</b>
                                </ButtonDropdown.Item>
                            ))}
                        </ButtonDropdown>
                    </Grid>
                    <Grid xs={24} sm={0}>
                        <ButtonDropdown className="LanguageDrawerDropdown">
                            <ButtonDropdown.Item main>
                                <b>{locale.toUpperCase()}</b>
                            </ButtonDropdown.Item>
                            {locales.map((loc) => (
                                <ButtonDropdown.Item
                                    key={loc}
                                    onClick={() => changeLanguage(loc)}
                                >
                                    <b>{loc.toUpperCase()}</b>
                                </ButtonDropdown.Item>
                            ))}
                        </ButtonDropdown>
                    </Grid>
                </Grid.Container>
            )}
            <style jsx global>
                {`
                    .LanguageDrawerDropdown {
                        width: 100% !important;
                        margin-bottom: 1rem;
                    }
                `}
            </style>
        </>
    )
}
