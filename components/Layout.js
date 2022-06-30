import Crown from './Crown'
import Footer from './Footer'
import Header from './Header'
import Helmet from './Helmet'
import Wrapper from './Wrapper'

import defaultProps from '../default.props'

const Layout = ({
    config,
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
                title={metaTitle}
                image={metaImage}
                description={metaDescription}
            />
            <Header config={config} themePreference={themePreference} />
            <Crown config={config} large={crownLarge} small={crownSmall} />
            <Wrapper config={config}>{children}</Wrapper>
            <Footer config={config} />
        </>
    )
}

Layout.defaultProps = defaultProps

export default Layout
