import { Text, Grid, useTheme, Spacer, Divider } from '@geist-ui/core'

const Footer = ({ config }) => {
    const theme = useTheme()

    return (
        <>
            <footer>
                <Text
                    className="FooterSignature"
                    style={{ fontSize: '0.65rem' }}
                >
                    &copy; {config.meta.title} 2022
                </Text>
            </footer>
            <style jsx global>
                {`
                    footer p {
                        color: ${theme.palette.accents_6}!important;
                    }
                    footer a {
                        color: ${theme.palette.accents_6}!important;
                    }
                    a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                    svg:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                    .FooterSignature {
                        margin: 1rem auto;
                    }
                    .FooterWrapper {
                        max-width: ${config.theme.width};
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        justify-content: center;
                    }
                    .FooterGrid {
                        justify-content: center;
                        margin: 0 auto;
                    }
                    .FooterGrid a {
                        font-size: 0.7rem !important;
                    }
                    footer {
                        border-top: 1px solid ${theme.palette.border};
                        text-align: center;
                    }
                    footer ul li:before {
                        display: none;
                    }
                    footer li {
                        color: ${theme.palette.accents_6}!important;
                        margin: 0;
                    }
                `}
            </style>
        </>
    )
}

export default Footer
