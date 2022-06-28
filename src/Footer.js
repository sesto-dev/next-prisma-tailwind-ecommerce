import { Text, useTheme } from '@geist-ui/core'

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
                    .FooterSignature {
                        margin: 1rem auto;
                    }
                    footer {
                        border-top: 1px solid ${theme.palette.border};
                        text-align: center;
                    }
                `}
            </style>
        </>
    )
}

export default Footer
