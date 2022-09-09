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
import { fetchHandler } from 'aryana'

export default function ({ id }) {
    const { config, i18n, useAuth, useRouter, Link, Head, axios, useMeta } =
        essentials

    const theme = useTheme()
    const router = useRouter()
    const { setMeta } = useMeta()
    const { locale = config['defaultLocale'] } = useRouter()
    const { setToast } = useToasts()

    const { title, description, info, products } = i18n['pages']['order']

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    useEffect(() => {
        async function resolve() {
            let response

            try {
                response = await axios.get(
                    config.routes.backend.order + `/${id}`
                )
            } catch (error) {
                response = error.response
            }

            fetchHandler({
                router,
                response,
                setLoading,
                setToast,
                setState: setOrder,
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

    const Bread = () => (
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
                <Breadcrumbs.Item>{order._id}</Breadcrumbs.Item>
            </Breadcrumbs>
        </Grid>
    )

    return (
        <Grid.Container gap={1}>
            {order ? (
                <>
                    <Bread />
                    <Grid xs={24}>
                        <Card
                            style={{
                                backgroundColor: theme.palette.accents_1,
                            }}
                            width="100%"
                            height="100%"
                        >
                            <Collapse.Group>
                                <Collapse
                                    title={info['title'][locale]}
                                    subtitle={info['description'][locale]}
                                    initialVisible
                                >
                                    <OrderInfo order={order} />
                                </Collapse>
                                <Collapse
                                    title={products['title'][locale]}
                                    subtitle={products['description'][locale]}
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
                            backgroundColor: theme.palette.accents_1,
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
