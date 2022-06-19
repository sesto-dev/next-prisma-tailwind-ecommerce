import Banner from './Banner'
import Footer from './Footer'
import Header from './Header'
import Helmet from './Helmet'
import Wrapper from './Wrapper'

const Layout = ({
    config,
    themePreference,
    bannerLarge,
    bannerSmall,
    metaTitle,
    metaDescription,
    metaImage,
    children,
}) => {
    return (
        <>
            <Helmet
                title={metaTitle}
                image={metaImage}
                description={metaDescription}
                config={config}
            />
            <Header config={config} themePreference={themePreference} />
            <Banner large={bannerLarge} small={bannerSmall} />
            <Wrapper>{children}</Wrapper>
            <Footer config={config} />
        </>
    )
}

Layout.defaultProps = {
    bannerLarge: 'Large Text',
    bannerSmall: 'Small text as a description for the page.',
    config: {
        meta: {
            title: 'GEIST-ABSTRACTION',
            url: 'https://example.com',
            handle: '@example',
            keywords: 'geist-ui, nextjs, reactjs',
        },
        links: {
            email: 'mailto:example@example.com',
            twitter: 'https://twitter.com/example',
            linkedin: 'https://linkedin.com/in/example',
            github: 'https://github.com/example',
            youtube: 'https://www.youtube.com/channel/example',
            instagram: 'https://instagram.com/example',
            pinterest: 'https://pinterest.com/example',
            angelco: 'https://angel.co/u/example',
            behance: 'https://www.behance.net/example',
            dribbble: 'https://dribbble.com/example',
            spotify: 'https://open.spotify.com/user/example',
            reddit: 'https://reddit.com/u/example',
        },
        tabs: [
            {
                label: 'EXPERIENCES',
                value: '/experiences',
            },
        ],
    },
    themePreference: null,
}

export default Layout
