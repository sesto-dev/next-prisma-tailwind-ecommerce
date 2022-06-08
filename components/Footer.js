import React from 'react'

import {
    Text,
    Grid,
    Link as GeistLink,
    useTheme,
    Spacer,
    Divider,
} from '@geist-ui/core'

const Footer = ({ config }) => {
    const theme = useTheme()

    return (
        <>
            <footer>
                <Spacer />
                <div className="FooterWrapper">
                    <Grid.Container gap={0}>
                        <Grid className="FooterGrid" xs={6}>
                            <ul>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.email}
                                    >
                                        Mail
                                    </GeistLink>
                                </li>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.linkedin}
                                    >
                                        Linkedin
                                    </GeistLink>
                                </li>
                            </ul>
                        </Grid>
                        <Grid className="FooterGrid" xs={6}>
                            <ul>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.github}
                                    >
                                        Github
                                    </GeistLink>
                                </li>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.youtube}
                                    >
                                        YouTube
                                    </GeistLink>
                                </li>
                            </ul>
                        </Grid>
                        <Grid className="FooterGrid" xs={6}>
                            <ul>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.spotify}
                                    >
                                        Spotify
                                    </GeistLink>
                                </li>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.reddit}
                                    >
                                        Reddit
                                    </GeistLink>
                                </li>
                            </ul>
                        </Grid>
                        <Grid className="FooterGrid" xs={6}>
                            <ul>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.twitter}
                                    >
                                        Twitter
                                    </GeistLink>
                                </li>
                                <li>
                                    <GeistLink
                                        target="_blank"
                                        rel="noopener"
                                        href={config.links.instagram}
                                    >
                                        Instagram
                                    </GeistLink>
                                </li>
                            </ul>
                        </Grid>
                    </Grid.Container>
                </div>
                <Spacer />
                <Divider />
                <Text
                    className="FooterSignature"
                    style={{ fontSize: '0.65rem' }}
                >
                    &copy; {config.meta.title} 2022
                </Text>
            </footer>
            <style jsx global>
                {`
                    footer p {
                        color: ${theme.palette.accents_6}!important;
                    }
                    footer a {
                        color: ${theme.palette.accents_6}!important;
                    }
                    a:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                    svg:hover {
                        color: ${theme.palette.foreground}!important;
                    }
                    .FooterSignature {
                        margin: 1rem auto;
                    }
                    .FooterWrapper {
                        max-width: ${theme.layout.pageWidthWithMargin};
                        margin: 0 auto;
                        padding: 0 ${theme.layout.pageMargin};
                        justify-content: center;
                    }
                    .FooterGrid {
                        justify-content: center;
                        margin: 0 auto;
                    }
                    .FooterGrid a {
                        font-size: 0.7rem !important;
                    }
                    footer {
                        border-top: 1px solid ${theme.palette.border};
                        text-align: center;
                    }
                    footer ul li:before {
                        display: none;
                    }
                    footer li {
                        color: ${theme.palette.accents_6}!important;
                        margin: 0;
                    }
                `}
            </style>
        </>
    )
}

export default Footer
