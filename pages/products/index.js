import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Button,
    Display,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
} from '@geist-ui/core'

import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { handleProductsData } from '../../helpers/handlers/productHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'
import { CartIcon } from '../../components/SVGs'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['root']['products']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [keyword, setKeyword] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [pages, setPages] = useState(null)
    const [products, setProducts] = useState({})

    async function resolve() {
        const response = await axios.get(config.backend.routes.products)

        handleProductsData(
            response,
            router,
            setPageNumber,
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
            crown={false}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card width="100%">Categories</Card>
                </Grid>
                <Grid xs={24}>
                    <Grid.Container gap={1}>
                        {pageNumber && pages && products ? (
                            <>
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
                                            <Link
                                                href={`/products/${product._id}`}
                                            >
                                                <a>
                                                    <Card
                                                        hoverable
                                                        width="100%"
                                                        height="100%"
                                                    >
                                                        <Image
                                                            height="20rem"
                                                            src={product.image}
                                                            style={{
                                                                objectFit:
                                                                    'cover',
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
                                                            {
                                                                product.description
                                                            }
                                                        </Text>
                                                        <Button
                                                            mt={1}
                                                            width="100%"
                                                            icon={<CartIcon />}
                                                        >
                                                            ${product.price}
                                                        </Button>
                                                    </Card>
                                                </a>
                                            </Link>
                                        </Grid>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                {[...Array(10)].map((x, i) => (
                                    <Grid
                                        key={Math.random()}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        xl={6}
                                    >
                                        <Card
                                            shadow
                                            width="100%"
                                            height="20rem"
                                            py="8rem"
                                        >
                                            <Loading />
                                        </Card>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid.Container>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}
