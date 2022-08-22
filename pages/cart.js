import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { X } from '@geist-ui/icons'
import {
    Text,
    Image,
    Divider,
    Loading,
    Card,
    Grid,
    useTheme,
    useToasts,
    Button,
} from '@geist-ui/core'

import config from '../config/main.config'
import i18n from '../config/i18n.config'

import Layout from '../components/Layout'
import { useThemeProvider } from '../state/Theme'
import { isLocaleRTL, getLocaleDirection } from '../helpers/RTL'
import { handleCartData } from '../handlers/CartHandlers'

export default function () {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config.defaultLocale } = router

    const folio = i18n['root']['cart']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [cart, setCart] = useState(null)

    async function resolve() {
        const response = await axios.get(config.backend.routes.getCart)
        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
            notVerifiedToast: i18n['toasts']['notVerified'][locale],
        })
    }

    useEffect(() => {
        resolve()
    }, [])

    async function removeCart(productID) {
        const response = await axios.post(
            config.backend.routes.removeCart,
            { productID },
            config.backend.axios.simple
        )
        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
            notVerifiedToast: i18n['toasts']['notVerified'][locale],
        })
    }

    const Product = ({ product, listing }) => (
        <Grid style={{ height: 'max-content', minHeight: '100pt' }} xs={24}>
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        width="100%"
                        style={{
                            backgroundColor: theme.palette.accents_1,
                            height: 'max-content',
                            minHeight: '100pt',
                        }}
                    >
                        <Card.Body height="100%" width="100%">
                            <Grid.Container gap={1}>
                                <Grid xs={6}>
                                    <Card
                                        width="100%"
                                        height="100%"
                                        style={{
                                            backgroundImage: `url(${product.image})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                </Grid>
                                <Grid style={{ display: 'block' }} xs={18}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text mt={0} mb={0.3} font="1.1rem">
                                            {product.title}
                                        </Text>
                                        <Text mt={0} mb={0.3}>
                                            {listing['price']}{' '}
                                        </Text>
                                    </div>
                                    <Text mt={0} font={0.7}>
                                        <Text span type="secondary">
                                            {`Platform:  `}
                                        </Text>
                                        {listing['platform'].toUpperCase()},{' '}
                                        <Text span type="secondary">
                                            {`Region:  `}
                                        </Text>
                                        {listing['region'].toUpperCase()}
                                    </Text>
                                    <Button
                                        style={{
                                            backgroundColor:
                                                theme.palette.accents_1,
                                        }}
                                        auto
                                        scale={0.6}
                                        icon={<X />}
                                        onClick={() => removeCart(product._id)}
                                    >
                                        Remove from cart
                                    </Button>
                                </Grid>
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Grid>
    )

    return (
        <Layout
            config={config}
            i18n={i18n}
            useThemeProvider={useThemeProvider}
            metaTitle={title}
            metaDescription={description}
            crownLarge={title}
            crownSmall={description}
        >
            <Grid.Container gap={2}>
                {cart ? (
                    <>
                        <Grid xs={24} md={16}>
                            <Grid.Container
                                style={{ height: 'max-content' }}
                                gap={1}
                            >
                                {cart.map(({ listing, product }) => {
                                    return (
                                        <Product
                                            key={product._id}
                                            listing={listing}
                                            product={product}
                                        />
                                    )
                                })}
                            </Grid.Container>
                        </Grid>
                        <Grid xs={24} md={8}>
                            <Card
                                width="100%"
                                style={{
                                    backgroundColor: theme.palette.accents_1,
                                    height: 'max-content',
                                }}
                            ></Card>
                        </Grid>
                    </>
                ) : (
                    <Grid xs={24}>
                        <Card
                            style={{
                                backgroundColor: `${theme.palette.accents_1}`,
                            }}
                            height="20rem"
                            pt="8rem"
                            width="100%"
                        >
                            <Loading />
                        </Card>
                    </Grid>
                )}
            </Grid.Container>
        </Layout>
    )
}
