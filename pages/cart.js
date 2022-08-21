import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Text,
    Image,
    Divider,
    Loading,
    Card,
    Grid,
    useTheme,
    useToasts,
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
        const response = await axios.get(config.backend.routes.cart)
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

    const Product = ({ product }) => (
        <Grid xs={24} sm={8} md={6}>
            <Card
                width="100%"
                height="100%"
                style={{ backgroundColor: theme.palette.accents_1 }}
            >
                <Image
                    height="100pt"
                    width="100%"
                    style={{
                        objectFit: 'cover',
                    }}
                    src={product.image}
                />
                <Card.Body height="100%">
                    <Text font="1.1rem">{product.name}</Text>
                </Card.Body>
            </Card>
        </Grid>
    )

    return (
        <Layout
            config={config}
            i18n={i18n}
            useThemeProvider={useThemeProvider}
            metaTitle={title}
            metaDescription={description}
            crownLarge="Cart"
            crownSmall="Your shopping cart content."
        >
            <Grid.Container gap={1}>
                {cart ? (
                    <>
                        {cart.cartArray &&
                            cart.cartArray.map((product) => {
                                return (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
                                )
                            })}
                        <Grid xs={24}>
                            <Divider width="100%" my={4} h={4}>
                                =
                            </Divider>
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
