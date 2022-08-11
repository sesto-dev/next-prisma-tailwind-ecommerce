import { useRouter } from 'next/router'
import { Spacer, Text, useTheme } from '@geist-ui/core'

import isLocaleRTL from '../helpers/isLocaleRTL'

export default function ({ config, large, small }) {
    const theme = useTheme()
    const { locale } = useRouter()
    const smallComponent = small

    return (
        <>
            <div className="Banner">
                <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                    <Text
                        h3
                        mb={0}
                        pb={0}
                        style={{
                            direction: isLocaleRTL(locale) ? 'rtl' : 'ltr',
                        }}
                    >
                        {large.toUpperCase()}
                    </Text>
                    <Text
                        mt={0.2}
                        type="secondary"
                        style={{
                            fontSize: '0.85rem',
                            direction: isLocaleRTL(locale) ? 'rtl' : 'ltr',
                        }}
                    >
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
