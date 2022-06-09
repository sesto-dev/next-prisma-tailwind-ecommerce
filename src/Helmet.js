import Head from 'next/head'

const Helmet = ({ config, title, url, description, keywords, image }) => {
    return (
        <Head>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="og:type" content="application" />
            <meta name="og:locale" content="en_US" />
            <meta name="twitter:site" content={config.meta.handle} />
            <meta name="twitter:creator" content={config.meta.handle} />
            <link rel="canonical" href={config.meta.url} />
            <meta name="theme-color" content="#000000" />

            <title>{title}</title>
            <meta name="twitter:text:title" content={title} />
            <meta name="twitter:title" content={title} />
            <meta name="og:title" content={title} />

            <meta name="description" content={description} />
            <meta name="og:description" content={description} />
            <meta name="twitter:description" content={description} />

            <meta name="twitter:image" content={image} />
            <meta name="og:image" content={image} />

            <meta name="og:url" content={url} />
            <meta name="keyword" content={keywords} />
        </Head>
    )
}

Helmet.defaultProps = {
    title: config.meta.title,
    url: config.meta.url,
    description: config.meta.description,
    image: config.meta.image,
    keywords: config.meta.keywords,
}

export default Helmet
