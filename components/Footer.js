import Link from 'next/link'
import { Text, Grid, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'
import isLocaleRTL from '../helpers/isLocaleRTL'

export default function ({ config, i18n }) {
    const theme = useTheme()
    const { locale } = useRouter()

    const footer = i18n['components']['footer']

    return (
        <>
            {footer && (
                <footer>
                    <div className="FooterWrapper">
                        <Grid.Container gap={1} my={2}>
                            {isLocaleRTL(locale) ? (
                                <>
                                    <Links config={config} footer={footer} />
                                    <Grid
                                        px={0}
                                        style={{ display: 'block' }}
                                        xs={24}
                                        md={8}
                                        mb={2}
                                    >
                                        <Text
                                            h4
                                            my={0}
                                            style={{
                                                textAlign: 'start',
                                                direction: 'rtl',
                                            }}
                                        >
                                            {footer['title'][
                                                locale
                                            ].toUpperCase()}
                                        </Text>
                                        <Text
                                            mt={0}
                                            style={{
                                                fontSize: '0.7rem',
                                                textAlign: 'right',
                                                direction: 'rtl',
                                            }}
                                            type="secondary"
                                        >
                                            {footer['copyright'][locale]}
                                        </Text>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid
                                        px={0}
                                        style={{ display: 'block' }}
                                        xs={24}
                                        md={8}
                                        mb={2}
                                    >
                                        <Text h4 my={0}>
                                            {footer['title'][
                                                locale
                                            ].toUpperCase()}
                                        </Text>
                                        <Text
                                            mt={0}
                                            small
                                            style={{ fontSize: '0.7rem' }}
                                            type="secondary"
                                        >
                                            {footer['copyright'][locale]}
                                        </Text>
                                    </Grid>
                                    <Links config={config} footer={footer} />
                                </>
                            )}
                        </Grid.Container>
                    </div>
                </footer>
            )}
            <style jsx global>
                {`
                    footer {
                        border-top: 1px solid ${theme.palette.border};
                    }
                    .FooterWrapper {
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        vertical-align: text-top;
                        box-sizing: border-box;
                    }
                    footer a {
                        color: ${theme.palette.accents_4}!important;
                    }
                    footer a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                `}
            </style>
        </>
    )
}

function Links({ config, footer }) {
    const { locale } = useRouter()

    return (
        <>
            <>
                {footer &&
                    footer.links.map((category) => {
                        return (
                            <Grid
                                style={{
                                    display: 'block',
                                }}
                                xs={12}
                                md={4}
                                key={Math.random()}
                            >
                                <Text
                                    h5
                                    b
                                    small
                                    style={{
                                        fontSize: '1rem',
                                        textAlign: isLocaleRTL(locale)
                                            ? 'start'
                                            : 'end',
                                    }}
                                >
                                    {category[locale]}
                                </Text>
                                {category['links'].map((link) => (
                                    <Link
                                        key={link['label'][locale]}
                                        href={link.value}
                                    >
                                        <a>
                                            <Text
                                                px={0}
                                                h5
                                                small
                                                style={{
                                                    fontSize: '1rem',
                                                    textAlign: isLocaleRTL(
                                                        locale
                                                    )
                                                        ? 'start'
                                                        : 'end',
                                                }}
                                            >
                                                {link['label'][locale]}
                                            </Text>
                                        </a>
                                    </Link>
                                ))}
                            </Grid>
                        )
                    })}
            </>
            <style jsx global>
                {`
                    h5 {
                        white-space: nowrap;
                    }
                `}
            </style>
        </>
    )
}
