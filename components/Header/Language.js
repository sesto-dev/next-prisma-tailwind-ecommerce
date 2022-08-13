import { ButtonDropdown, useTheme } from '@geist-ui/core'
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
                <ButtonDropdown scale={0.63} auto>
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
            )}
        </>
    )
}
