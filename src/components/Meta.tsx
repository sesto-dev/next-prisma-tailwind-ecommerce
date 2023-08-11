import Config from 'main.config'
import { NextSeo } from 'next-seo'

const { siteName, handle } = Config

export default function Meta({ title, description, canonical, image }) {
    return (
        <NextSeo
            title={title}
            description={description}
            canonical={canonical}
            openGraph={{
                url: canonical,
                title,
                description,
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 600,
                        alt: 'Og Image Alt',
                        type: 'image/jpeg',
                    },
                ],
                siteName,
            }}
            twitter={{
                handle,
                site: handle,
                cardType: 'summary_large_image',
            }}
        />
    )
}
