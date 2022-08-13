import Head from 'next/head'
import { useRouter } from 'next/router'

export default function ({ config, i18n, title, description, image }) {
    const { locale = config.defaultLocale } = useRouter()

    title = title ? title : i18n['meta']['title'][locale]
    description = description
        ? description
        : i18n['meta']['description'][locale]
    image = image ? image : config.meta.image

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

            <meta name="og:url" content={config.meta.url} />
            <meta name="keyword" content={config.meta.keywords} />
        </Head>
    )
}
