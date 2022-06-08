import { Spacer, Text, useTheme } from '@geist-ui/core'

const Banner = ({ header, small }) => {
    const theme = useTheme()

    return (
        <>
            <div className="Banner">
                <div style={{ marginTop: '2rem', marginBottom: '3rem' }}>
                    <Text h2 mb={1}>
                        {header}
                    </Text>
                    <Text small>{small}</Text>
                </div>
            </div>
            <Spacer />
            <style jsx global>
                {`
                    .Banner {
                        width: ${theme.layout.pageWidthWithMargin};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        box-sizing: border-box;
                    }
                `}
            </style>
        </>
    )
}

Banner.defaultProps = {
    header: 'Header',
    small: 'Small text as a description for the page.',
}

export default Banner
