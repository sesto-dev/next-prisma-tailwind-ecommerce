import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Description,
    Button,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
} from '@geist-ui/core'

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { handleProductData } from '../../helpers/handlers/productHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'
import { CartIcon } from '../../components/SVGs'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { pid } = router.query
    const { setToast } = useToasts()

    const folio = i18n['root']['product']
    const description = folio['description'][locale]

    const [product, setProduct] = useState({})
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState(folio['title'][locale])

    async function resolve() {
        const route = config.backend.routes.products + `/${pid}`
        const response = await axios.get(route)

        handleProductData(
            response,
            router,
            setTitle,
            setImage,
            setProduct,
            setToast,
            i18n['toasts']['noDataReceived'][locale]
        )
    }

    useEffect(() => {
        resolve()
    }, [])

    return (
        <Layout
            config={config}
            i18n={i18n}
            useThemeProvider={useThemeProvider}
            crown={false}
            metaTitle={title}
            metaDescription={description}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    {product ? (
                        <Card
                            style={{
                                backgroundColor: `${theme.palette.accents_1}`,
                            }}
                            width="100%"
                        >
                            <Image
                                height="50vh"
                                src={product.image}
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                            <Description
                                mt={1}
                                title="Title"
                                content={
                                    <Text mt={0.7} h3>
                                        {product.name}
                                    </Text>
                                }
                            />
                            <Description
                                mt={1}
                                title="Description"
                                content={<Text>{product.description}</Text>}
                            />
                        </Card>
                    ) : (
                        <Card
                            style={{
                                backgroundColor: `${theme.palette.accents_1}`,
                            }}
                            width="100%"
                        >
                            <Loading />
                        </Card>
                    )}
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
