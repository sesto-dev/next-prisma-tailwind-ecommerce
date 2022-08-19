import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Collapse,
    Description,
    Breadcrumbs,
    Button,
    Badge,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
} from '@geist-ui/core'

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { handleOrderData } from '../../handlers/OrderHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function ({ id }) {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['root']['order']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [order, setOrder] = useState({})

    async function resolve() {
        const route = config.backend.routes.order + `/${id}`
        const response = await axios.get(route)

        handleOrderData({
            response,
            router,
            setOrder,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    useEffect(() => {
        resolve()
    }, [])

    const OrderInfo = ({ order }) => (
        <Grid.Container gap={1}>
            <Grid xs={24} md={12}>
                <Description
                    width="100%"
                    title="ID"
                    content={
                        <Text width="100%" mt={0} blockquote font="1rem">
                            {order._id}
                        </Text>
                    }
                />
            </Grid>
            <Grid xs={24} md={12}>
                <Description
                    width="100%"
                    title="Email"
                    content={
                        <Text width="100%" mt={0} blockquote font="1rem">
                            {order.createdAt}
                        </Text>
                    }
                />
            </Grid>
            <Grid xs={24} md={12}>
                <Description
                    width="100%"
                    title="Referral Code"
                    content={
                        <Text width="100%" mt={0} blockquote font="1rem">
                            {order.isPaid}
                        </Text>
                    }
                />
            </Grid>
        </Grid.Container>
    )

    const Products = ({ order }) => (
        <Grid.Container gap={1}>
            {order.productsArray &&
                order.productsArray.map((product) => {
                    return <Product key={product._id} product={product} />
                })}
        </Grid.Container>
    )

    const Product = ({ product }) => (
        <Grid xs={24} sm={12} md={8}>
            <Link href={`/product/${product._id}`}>
                <a>
                    <Card width="100%" height="100%">
                        <Image
                            height="20rem"
                            src={product.image}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <Text small>{product.name}</Text>
                    </Card>
                </a>
            </Link>
        </Grid>
    )

    return (
        <>
            <Layout
                config={config}
                i18n={i18n}
                useThemeProvider={useThemeProvider}
                metaTitle={title}
                metaDescription={description}
            >
                <Grid.Container gap={1}>
                    {order ? (
                        <>
                            <Grid xs={24}>
                                <Breadcrumbs className="Bread" mb={1}>
                                    <Link href="/">
                                        <a>
                                            <Breadcrumbs.Item>
                                                Home
                                            </Breadcrumbs.Item>
                                        </a>
                                    </Link>
                                    <Link href="/user">
                                        <a>
                                            <Breadcrumbs.Item>
                                                Orders
                                            </Breadcrumbs.Item>
                                        </a>
                                    </Link>
                                    <Breadcrumbs.Item>
                                        {order.name}
                                    </Breadcrumbs.Item>
                                </Breadcrumbs>
                            </Grid>
                            <Grid xs={24}>
                                <Card
                                    style={{
                                        backgroundColor: `${theme.palette.accents_1}`,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Collapse.Group>
                                        <Collapse
                                            title="Order Info"
                                            subtitle="Basic order information provided."
                                            initialVisible
                                        >
                                            <OrderInfo order={order} />
                                        </Collapse>
                                        <Collapse
                                            title="Products"
                                            subtitle="Your order history."
                                            style={{ borderBottom: 'none' }}
                                        >
                                            <Products order={order} />
                                        </Collapse>
                                    </Collapse.Group>
                                </Card>
                            </Grid>
                        </>
                    ) : (
                        <Grid xs={24}>
                            <Card
                                style={{
                                    backgroundColor: `${theme.palette.accents_1}`,
                                }}
                                width="100%"
                            >
                                <Loading />
                            </Card>
                        </Grid>
                    )}
                </Grid.Container>
            </Layout>
            <style jsx global>
                {`
                    a {
                        color: ${theme.palette.accents_3} !important;
                    }
                    a:hover {
                        color: ${theme.palette.foreground} !important;
                    }
                    .Bread > a {
                        white-space: nowrap;
                    }
                    .Bread > span {
                        white-space: nowrap;
                    }
                `}
            </style>
        </>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    return {
        props: { id },
    }
}
