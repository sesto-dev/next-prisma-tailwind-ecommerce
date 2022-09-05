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
import essentials from '../../helpers/getEssentials'

export default function ({ id }) {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
        useMeta,
    } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { setMeta } = useMeta()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description } = i18n['pages']['order']

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    const [order, setOrder] = useState({})

    useEffect(() => {
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

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            src={product.images[0]}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <Text small>{product.title}</Text>
                    </Card>
                </a>
            </Link>
        </Grid>
    )

    return (
        <Grid.Container gap={1}>
            {order ? (
                <>
                    <Grid xs={24}>
                        <Breadcrumbs className="Bread" mb={1}>
                            <Link href="/">
                                <a>
                                    <Breadcrumbs.Item>Home</Breadcrumbs.Item>
                                </a>
                            </Link>
                            <Link href="/user">
                                <a>
                                    <Breadcrumbs.Item>Orders</Breadcrumbs.Item>
                                </a>
                            </Link>
                            <Breadcrumbs.Item>{order.name}</Breadcrumbs.Item>
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
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    return {
        props: { id },
    }
}
