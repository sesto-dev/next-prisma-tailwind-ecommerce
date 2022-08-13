import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Description,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
} from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { handleProductData } from '../../helpers/handlers/productHandlers'
import ProductCard from '../../components/ProductCard'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const pageData = i18n['root']['products']
    const title = pageData['title'][locale]
    const description = pageData['description'][locale]

    const [page, setPage] = useState(null)
    const [pages, setPages] = useState(null)
    const [products, setProducts] = useState({})

    async function resolve() {
        const response = await axios.get(config.backend.routes.products)
        handleProductData(
            response,
            router,
            setPage,
            setPages,
            setProducts,
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
            themePreference={themePreference}
            crownLarge={title}
            crownSmall={description}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        style={{
                            backgroundColor: `${theme.palette.accents_1}`,
                        }}
                        width="100%"
                    >
                        {page && pages && products ? (
                            <Grid.Container gap={1}>
                                {products.map((product) => {
                                    console.log(product)
                                    return (
                                        <Grid
                                            key={product._id}
                                            xs={24}
                                            sm={12}
                                            md={8}
                                            xl={6}
                                        >
                                            <Card width="100%">
                                                <Image
                                                    height="20rem"
                                                    src={product.image}
                                                    style={{
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <Text b mb={0}>
                                                    {product.name},{' '}
                                                </Text>
                                                <Text
                                                    small
                                                    style={{
                                                        color: `${theme.palette.accents_6}`,
                                                    }}
                                                >
                                                    {product.description}
                                                </Text>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid.Container>
                        ) : (
                            <Loading />
                        )}
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
