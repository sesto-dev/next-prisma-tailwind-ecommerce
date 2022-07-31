import Link from 'next/link'

import {
    Text,
    Grid,
    Link as GeistLink,
    useTheme,
    Spacer,
    Divider,
} from '@geist-ui/core'

export default function ({ config }) {
    const theme = useTheme()
    console.log(theme)

    return (
        <>
            <footer>
                <div className="FootNav">
                    <Grid.Container>
                        <Grid xs={24} md={12}>
                            <div className="Block">
                                <Text my={0} h3>
                                    {config['meta']['title'].toUpperCase()}
                                </Text>
                                <Text
                                    mt={0}
                                    small
                                    style={{ fontSize: '0.75rem' }}
                                >
                                    Copyright &copy; 2022 {config.meta.title}.
                                    All rights reserved.
                                </Text>
                            </div>
                        </Grid>
                        <Grid style={{ justifyContent: 'end' }} xs={0} md={12}>
                            <div className="Space">
                                <Links config={config} />
                            </div>
                        </Grid>
                    </Grid.Container>
                </div>
            </footer>
            <style jsx global>
                {`
                    .FootNav {
                        display: flex;
                        align-items: start;
                        justify-content: space-between;
                        width: ${config.theme.width};
                        max-width: 100%;
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        vertical-align: text-top;
                        box-sizing: border-box;
                    }
                    .Space {
                        display: flex;
                        text-align: right;
                        align-items: start;
                    }
                    .Block {
                        display: block;
                        text-align: left;
                    }
                    footer a {
                        color: ${theme.palette.accents_3}!important;
                    }
                    footer {
                        border-top: 1px solid ${theme.palette.border};
                        text-align: center;
                        justify-content: center;
                        padding-top: 2rem;
                        padding-bottom: 2rem;
                    }
                `}
            </style>
        </>
    )
}

function Links({ config }) {
    return (
        <>
            {config.footer.map((foot) => (
                <div key={Math.random()}>
                    {foot.map((foo) => (
                        <Link key={foo.label} href={foo.value}>
                            <a>
                                <Text ml={2} h6 small>
                                    {foo.label}
                                </Text>
                            </a>
                        </Link>
                    ))}
                </div>
            ))}
        </>
    )
}
