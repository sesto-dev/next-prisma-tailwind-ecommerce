import { useTheme } from '@geist-ui/core'

const Wrapper = ({ config, children }) => {
    const theme = useTheme()

    return (
        <>
            <div className="PageWrapper">
                <div className="PageContent">{children}</div>
            </div>
            <style jsx global>
                {`
                    .PageWrapper {
                        background-color: ${theme.palette.accents_1};
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

export default Wrapper
