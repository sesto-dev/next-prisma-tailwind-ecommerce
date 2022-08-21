import { useTheme } from '@geist-ui/core'

export default function ({ config, children }) {
    const theme = useTheme()

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
                `}
            </style>
        </>
    )
}
