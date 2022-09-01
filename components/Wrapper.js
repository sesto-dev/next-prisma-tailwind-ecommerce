import { useRouter } from 'next/router'
import { useTheme } from '@geist-ui/core'

import {
    isLocaleRTL,
    getLocaleDirection,
    getLocaleAlignment,
} from '../helpers/RTL'

export default function ({ config, children }) {
    const theme = useTheme()
    const { locale = config.defaultLocale } = useRouter()

    return (
        <>
            <div className="PageWrapper">
                <div className="PageContent">{children}</div>
            </div>
            <style jsx global>
                {`
                    html,
                    body {
                        background-color: ${theme.type == 'light'
                            ? config.theme.lightBackground
                            : config.theme.darkBackground}!important;
                    }

                    @font-face {
                        font-family: 'Yekan';
                        src: url('/fonts/Yekan/Yekan.woff');
                    }

                    html,
                    body,
                    a,
                    p,
                    small,
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    dd,
                    dt,
                    dl {
                        font-family: 'Inter', 'Yekan', 'Segoe UI', 'Roboto' !important;
                    }

                    .PageWrapper {
                        transform: translateY(-5px);
                    }
                    .PageContent {
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        transform: translateY(-35px);
                        box-sizing: border-box;
                    }
                    .divider > span {
                        background-color: ${theme.type === 'dark'
                            ? config.theme.darkBackground
                            : config.theme.lightBackground} !important;
                        color: ${theme.palette.accents_4} !important;
                    }
                    .clear-icon > svg {
                        color: ${theme.palette.code} !important;
                    }
                    a {
                        color: ${theme.palette.code} !important;
                        transition: color 0.3s ease;
                    }
                    a:hover {
                        color: ${theme.palette.accents_4} !important;
                    }
                    .FooterLink {
                        color: ${theme.palette.accents_4} !important;
                        transition: color 0.3s ease;
                    }
                    .FooterLink:hover {
                        color: ${theme.palette.code} !important;
                    }
                    .Bread a {
                        color: ${theme.palette.accents_4} !important;
                        transition: color 0.3s ease;
                    }
                    .Bread a:hover {
                        color: ${theme.palette.code} !important;
                    }
                    .Bread > span {
                        white-space: nowrap;
                    }
                    table {
                        overflow: 'scroll' !important;
                    }
                    .avanti > .item {
                        justify-content: ${isLocaleRTL(locale)
                            ? 'end'
                            : 'start'};
                    }
                    input::placeholder {
                        text-align: ${isLocaleRTL(locale) ? 'right' : 'left'};
                        direction: ${getLocaleDirection(locale)} !important;
                    }

                    .collapse > .view > .title > h3 {
                        position: ${isLocaleRTL(locale) &&
                        'absolute !important'};
                        right: ${isLocaleRTL(locale) && '2.5rem !important'};
                        direction: ${getLocaleDirection(locale)};
                        text-align: ${getLocaleAlignment(locale)};
                    }
                    .collapse > .view {
                        margin-bottom: ${isLocaleRTL(locale) &&
                        '0.6em !important'};
                    }
                    .collapse > .view > .subtitle {
                        direction: ${getLocaleDirection(locale)};
                        text-align: ${getLocaleAlignment(locale)};
                        margin-top: ${isLocaleRTL(locale) &&
                        '0.6rem !important'};
                    }
                `}
            </style>
        </>
    )
}
