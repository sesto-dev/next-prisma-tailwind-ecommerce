import { useTheme } from '@geist-ui/core'

const Wrapper = (props) => {
    const theme = useTheme()

    return (
        <>
            <div className="PageWrapper">
                <div className="PageContent">{props.children}</div>
            </div>
            <style jsx global>
                {`
                    .PageWrapper {
                        background-color: ${theme.palette.accents_1};
                    }
                    .PageContent {
                        width: ${theme.layout.pageWidthWithMargin};
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
