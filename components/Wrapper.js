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
                `}
            </style>
        </>
    )
}
