import { ChevronLeft, ChevronRight, ShoppingCart } from '@geist-ui/icons'
import { memo, useEffect, useState } from 'react'
import {
    useToasts,
    Collapse,
    Description,
    Breadcrumbs,
    Button,
    Code,
    Badge,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    useTheme,
    Select,
    Divider,
} from '@geist-ui/core'

import {
    fetchHandler,
    getLocaleDirection,
    getPersianNumber,
    Helmet,
} from 'aryana'

import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function ({ id }) {
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config['defaultLocale'] } = useRouter()

    const [product, setProduct] = useState({})
    const [listingID, setListingID] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function resolve() {
            let response

            try {
                response = await axios.get(
                    config.routes.backend.products + `/${id}`
                )
            } catch (error) {
                response = error.response
            }

            fetchHandler({
                router,
                response,
                setLoading,
                setToast,
                setState: setProduct,
            })
        }

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid.Container gap={1}>
            <Helmet
                Head={Head}
                i18n={i18n}
                title="Elden Ring"
                description="Action Adventure Game"
                image="https://image.api.playstation.com/vulcan/img/rnd/202201/1918/0P25Aw0mnLS1AwPYEUb6kIYC.png"
            />
            <Bread product={product} />
            <ProductImages product={product} />
            <ProductMain
                product={product}
                listingID={listingID}
                setListingID={setListingID}
                loading={loading}
                setLoading={setLoading}
            />
            <ProductDescription product={product} />
        </Grid.Container>
    )
}

const Bread = ({ product }) => {
    return (
        <Grid xs={24}>
            <Breadcrumbs className="Bread" mb={1}>
                <Link href="/">
                    <a>
                        <Breadcrumbs.Item>Home</Breadcrumbs.Item>
                    </a>
                </Link>
                <Link href="/products">
                    <a>
                        <Breadcrumbs.Item>Products</Breadcrumbs.Item>
                    </a>
                </Link>
                <Breadcrumbs.Item>
                    {product.title ? product.title : '---'}
                </Breadcrumbs.Item>
            </Breadcrumbs>
        </Grid>
    )
}

const ProductImages = ({ product }) => {
    return (
        <Grid xs={24} md={9}>
            <Image
                src={
                    product && product.images
                        ? product.images[0]
                        : 'https://cdn.dribbble.com/users/1770290/screenshots/6158205/bg_75.gif'
                }
                width="100%"
                height="100%"
                style={{
                    objectFit: 'cover',
                }}
            />
        </Grid>
    )
}

const ProductMain = ({
    product,
    listingID,
    setListingID,
    loading,
    setLoading,
}) => {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config['defaultLocale'] } = useRouter()

    async function insertToCart() {
        let response

        try {
            response = await axios.post(
                config.routes.backend.insertCart,
                { listingID },
                config.axios.simple
            )
        } catch (error) {
            response = error.response
        }

        fetchHandler({
            router,
            response,
            setLoading,
            setToast,
            success_toast: i18n['toasts']['addToCart'][locale],
        })
    }

    return (
        <Grid xs={24} md={15}>
            <Card
                style={{
                    backgroundColor: theme.palette.accents_1,
                }}
                width="100%"
                height="100%"
            >
                <Description
                    title="Title"
                    content={<Text font="1.4rem">{product.title}</Text>}
                    mb={1}
                />
                <Description
                    title="Description"
                    content={
                        <Text p small>
                            {product.description}
                        </Text>
                    }
                    mb={1}
                />
                <Description
                    title="Platforms"
                    content={
                        product.listings &&
                        product.listings.map((listing) => {
                            return (
                                <Badge
                                    style={{
                                        backgroundColor:
                                            theme.palette.accents_6,
                                        color: theme.palette.background,
                                    }}
                                    mr={0.5}
                                    mb={0}
                                    px="0.7rem"
                                    scale={0.8}
                                    key={Math.random()}
                                >
                                    {listing.platform && listing.platform}
                                </Badge>
                            )
                        })
                    }
                    mb={1}
                />
                <Description
                    title="Tags"
                    content={
                        product.tags &&
                        product.tags.map((tag) => {
                            return (
                                <Badge
                                    style={{
                                        backgroundColor:
                                            theme.palette.accents_2,
                                        color: theme.palette.foreground,
                                    }}
                                    mr={0.5}
                                    mb={0}
                                    px="0.7rem"
                                    scale={0.8}
                                    key={tag}
                                >
                                    {tag}
                                </Badge>
                            )
                        })
                    }
                    mb={1}
                />
                <Divider my={4} width="100%" />
                <div
                    style={{
                        display: 'block!important',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Select
                        style={{
                            minHeight: '3rem',
                            minWidth: '100% !important',
                        }}
                        width="100%"
                        placeholder="Choose listing"
                        value={listingID}
                        onChange={(val) => setListingID(val)}
                        mb={0.7}
                    >
                        {product.listings &&
                            product.listings.map((listing, index) => {
                                return (
                                    <Select.Option
                                        key={listing._id}
                                        value={listing._id}
                                    >
                                        {'platform: '}
                                        <Code>{listing.platform}</Code>
                                        {', region: '}
                                        <Code>{listing.region}</Code>
                                        {', price: '}
                                        <Code>{listing.price}</Code>
                                    </Select.Option>
                                )
                            })}
                    </Select>
                    <Button
                        width="100%"
                        icon={<ShoppingCart />}
                        type="secondary"
                        onClick={() => insertToCart()}
                    >
                        {product.listings && (
                            <Text
                                style={{
                                    direction: getLocaleDirection(locale),
                                }}
                            >
                                {locale == 'fa'
                                    ? getPersianNumber(
                                          product['listings'][0]['price']
                                      )
                                    : product['listings'][0][
                                          'price'
                                      ].toLocaleString()}{' '}
                                {i18n['currency'][locale]}
                            </Text>
                        )}
                    </Button>
                </div>
            </Card>
        </Grid>
    )
}

const ProductDescription = ({ product }) => {
    const theme = useTheme()

    return (
        <Grid xs={24}>
            <Card
                style={{
                    backgroundColor: theme.palette.accents_1,
                }}
            >
                <Collapse.Group>
                    <Collapse title="Question A" initialVisible>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Text>
                    </Collapse>
                    <Collapse
                        style={{ borderBottom: 'none' }}
                        title="Question B"
                    >
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Text>
                    </Collapse>
                </Collapse.Group>
            </Card>
        </Grid>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    return {
        props: { id },
    }
}
