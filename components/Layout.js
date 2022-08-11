import Crown from './Crown'
import Footer from './Footer'
import Header from './Header/Header'
import Helmet from './Helmet'
import Wrapper from './Wrapper'

import defaultProps from '../default.props'

const Layout = ({
    config,
    i18n,
    themePreference,
    crownLarge,
    crownSmall,
    metaTitle,
    metaDescription,
    metaImage,
    children,
}) => {
    return (
        <>
            <Helmet
                config={config}
                i18n={i18n}
                title={metaTitle}
                image={metaImage}
                description={metaDescription}
            />
            <Header
                config={config}
                i18n={i18n}
                themePreference={themePreference}
            />
            <Crown
                config={config}
                i18n={i18n}
                large={crownLarge}
                small={crownSmall}
            />
            <Wrapper config={config}>{children}</Wrapper>
            <Footer config={config} i18n={i18n} />
        </>
    )
}

Layout.defaultProps = defaultProps

export default Layout
