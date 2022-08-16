import {
    Grid,
    ButtonGroup,
    Button,
    ButtonDropdown,
    useTheme,
} from '@geist-ui/core'
import { useRouter } from 'next/router'
import { isLocaleRTL } from '../../helpers/RTL'
import { LanguageIcon } from '../SVGs'

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

    const LocaleDropdown = () => (
        <>
            <Grid xs={0} sm={24}>
                <ButtonDropdown className="MainDropdown" scale={0.63} auto>
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
        </>
    )

    const LocaleButton = () => (
        <>
            <Grid xs={24} sm={0}>
                <ButtonGroup mx={0} mb={3} width="100%">
                    {locales.map((loc) => (
                        <Button
                            disabled={locale == loc}
                            icon={locale != loc && <LanguageIcon />}
                            key={loc}
                            onClick={() => changeLanguage(loc)}
                        >
                            <b>{loc.toUpperCase()}</b>
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
            <Grid xs={0} sm={24}>
                <ButtonGroup
                    my={0}
                    ml={isLocaleRTL(locale) && 1.5}
                    mr={!isLocaleRTL(locale) && 1.5}
                >
                    {locales.map((loc) => (
                        <Button
                            scale={0.6}
                            disabled={locale == loc}
                            icon={locale != loc && <LanguageIcon />}
                            key={loc}
                            onClick={() => changeLanguage(loc)}
                        >
                            <b>{loc.toUpperCase()}</b>
                        </Button>
                    ))}
                </ButtonGroup>
            </Grid>
        </>
    )

    return (
        <>
            {locale && locales && (
                <Grid.Container>
                    {locales.length > 2 ? <LocaleDropdown /> : <LocaleButton />}
                </Grid.Container>
            )}
            <style jsx global>
                {`
                    .LanguageDrawerDropdown {
                        width: 100% !important;
                        margin-bottom: 1rem;
                    }
                    .btn-group > button {
                        width: 100% !important;
                    }
                `}
            </style>
        </>
    )
}
