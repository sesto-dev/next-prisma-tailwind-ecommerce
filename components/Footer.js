import Link from 'next/link'

import { Text, Grid, useTheme } from '@geist-ui/core'

export default function ({ config }) {
    const theme = useTheme()

    return (
        <>
            <footer>
                <div className="FooterWrapper">
                    <Grid.Container gap={2}>
                        <Grid xs={24} md={18}>
                            <div className="Space">
                                <Links config={config} />
                            </div>
                        </Grid>
                        <Grid xs={24} md={6}>
                            <div className="Block">
                                <Text my={0} h4>
                                    {config['meta']['title'].toUpperCase()}
                                </Text>
                                <Text
                                    mt={0}
                                    small
                                    style={{ fontSize: '0.7rem' }}
                                    type="secondary"
                                >
                                    Copyright &copy; {new Date().getFullYear()}{' '}
                                    {config.meta.title}. All rights reserved.
                                </Text>
                            </div>
                        </Grid>
                    </Grid.Container>
                </div>
            </footer>
            <style jsx global>
                {`
                    .FooterWrapper {
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
                        max-width: 100%;
                        display: flex;
                        text-align: left;
                    }
                    .Block {
                        display: block;
                        text-align: right;
                        margin-left: auto;
                    }
                    footer a {
                        color: ${theme.palette.accents_4}!important;
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
            {Object.keys(config['footer']).map((category) => {
                const element = config['footer'][category]

                return (
                    <div key={Math.random()}>
                        <Text h5 small style={{ fontSize: '1rem' }}>
                            {category}
                        </Text>
                        {element.map((foo) => (
                            <Link key={foo.label} href={foo.value}>
                                <a>
                                    <Text
                                        mr={4}
                                        h5
                                        small
                                        style={{ fontSize: '1rem' }}
                                    >
                                        {foo.label}
                                    </Text>
                                </a>
                            </Link>
                        ))}
                    </div>
                )
            })}
        </>
    )
}
