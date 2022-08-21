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

    const Product = ({ product }) => (
        <Grid style={{ height: 'max-content' }} xs={24}>
            <Grid.Container gap={1}>
                <Grid xs={6}>
                    <Image
                        width="100%"
                        height="100pt"
                        style={{
                            objectFit: 'cover',
                        }}
                        src={product.image}
                    />
                </Grid>
                <Grid xs={18}>
                    <Card
                        width="100%"
                        height="100pt"
                        style={{ backgroundColor: theme.palette.accents_1 }}
                    >
                        <Text font="0.9rem">{product.name}</Text>
                        <Button
                            width="100%"
                            scale={0.8}
                            icon={<X />}
                            onClick={() => removeCart(product._id)}
                        />
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
                        <Grid xs={24} md={14}>
                            <Grid.Container
                                style={{ height: 'max-content' }}
                                gap={1}
                            >
                                {cart.map((product) => {
                                    return (
                                        <Product
                                            key={product._id}
                                            product={product}
                                        />
                                    )
                                })}
                            </Grid.Container>
                        </Grid>
                        <Grid xs={24} md={10}>
                            <Card
                                width="100%"
                                height="500pt"
                                style={{
                                    backgroundColor: theme.palette.accents_1,
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
