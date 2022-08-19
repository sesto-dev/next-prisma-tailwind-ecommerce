import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
    Text,
    Image,
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
        <Grid height="10rem" xs={24}>
            <Card width="100%">
                <Card.Body>
                    <Grid.Container gap={1}>
                        <Grid height="10rem" xs={8}>
                            <Image
                                style={{
                                    objectFit: 'cover',
                                }}
                                width="100%"
                                height="7rem"
                                src={product.image}
                            />
                        </Grid>
                        <Grid xs={16}>
                            <div style={{ display: 'block' }}>
                                <Text b h3>
                                    {product.name}
                                </Text>
                                <Text p small>
                                    {product.description}
                                </Text>
                            </div>
                        </Grid>
                    </Grid.Container>
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
        >
            <Grid.Container gap={1}>
                <Grid xs={24}>
                    <Card
                        style={{
                            backgroundColor: `${theme.palette.accents_1}`,
                        }}
                        width="100%"
                    >
                        {cart ? (
                            <Grid.Container gap={1}>
                                {cart.cartArray &&
                                    cart.cartArray.map((product) => {
                                        return (
                                            <Product
                                                key={product._id}
                                                product={product}
                                            />
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
