import { Spacer, Text, useTheme } from '@geist-ui/core'

export default function ({ config, large, small }) {
    const theme = useTheme()
    const smallComponent = small

    return (
        <>
            <div className="Banner">
                <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                    <Text h3 mb={0} pb={0}>
                        {large.toUpperCase()}
                    </Text>
                    <Text type="secondary" small>
                        {smallComponent}
                    </Text>
                </div>
            </div>
            <Spacer />
            <style jsx global>
                {`
                    .Banner {
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        box-sizing: border-box;
                        text-align: justify !important;
                    }
                `}
            </style>
        </>
    )
}
