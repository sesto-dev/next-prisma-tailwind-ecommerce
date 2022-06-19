import { Spacer, Text, useTheme } from '@geist-ui/core'

const Banner = ({ large, small }) => {
    const theme = useTheme()

    return (
        <>
            <div className="Banner">
                <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                    <Text h3 mb={0} pb={0}>
                        {large}
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

export default Banner
