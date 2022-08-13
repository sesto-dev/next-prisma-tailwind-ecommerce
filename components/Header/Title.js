import { Text, useTheme } from '@geist-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()

    return (
        <>
            {i18n && (
                <>
                    <Text mt={1.5} className="MenuNavigationTitle">
                        <Link className="MenuNavigationTitle" href="/">
                            {i18n['components']['header']['title'][
                                locale
                            ].toUpperCase()}
                        </Link>
                    </Text>
                </>
            )}
            <style jsx global>
                {`
                    .MenuNavigationTitle a {
                        color: ${theme.palette.foreground}!important;
                        font-size: 2rem;
                        font-weight: 600;
                        letter-spacing: ${locale == 'en' ? '0.3rem' : 0};
                    }
                `}
            </style>
        </>
    )
}
