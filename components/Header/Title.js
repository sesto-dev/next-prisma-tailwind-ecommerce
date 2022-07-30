import { Text, useTheme } from '@geist-ui/core'
import Link from 'next/link'

export default function Title({ config }) {
    const theme = useTheme()

    return (
        <>
            <Text mt={1.5} className="MenuNavigationTitle">
                <Link className="MenuNavigationTitle" href="/">
                    {config['meta']['title'].toUpperCase()}
                </Link>
            </Text>
            <style jsx global>
                {`
                    .MenuNavigationTitle a {
                        color: ${theme.palette.accents_5}!important;
                        font-size: 1.65rem;
                        font-weight: 450;
                        letter-spacing: 0.3rem;
                    }
                    .MenuNavigationTitle a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                `}
            </style>
        </>
    )
}
