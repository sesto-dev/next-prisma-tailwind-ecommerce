import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
    useToasts,
    Button,
    Pagination,
    Image,
    Text,
    Loading,
    Card,
    Grid,
    Select,
    useTheme,
    Divider,
    Code,
} from '@geist-ui/core'
import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { handleProductsData } from '../../handlers/productHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

import { ShoppingCart, ChevronLeft, ChevronRight } from '@geist-ui/icons'

export default function ({ page, category, tags, sort }) {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config.defaultLocale } = router

    const folio = i18n['root']['products']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [keyword, setKeyword] = useState(null)
    const [pages, setPages] = useState(null)
    const [products, setProducts] = useState(null)

    async function resolve() {
        const response = await axios.post(
            config.backend.routes.products,
            {
                page,
            },
            config.backend.axios.simple
        )

        handleProductsData({
            response,
            router,
            setPages,
            setProducts,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    useEffect(() => {
        resolve()
    }, [router])

    const handler = (val) => {}

    const Paginated = () => (
        <Card
            style={{
                backgroundColor: theme.palette.accents_1,
            }}
            className="PaginationCard"
            width="100%"
        >
            <center>
                {pages ? (
                    <Pagination
                        width="100%"
                        count={pages}
                        initialPage={page}
                        limit={6}
                        onChange={(num) => {
                            if (num === page) {
                                return
                            }

                            const searchParamas = new URLSearchParams(
                                router.query
                            )
                            searchParamas.set('page', num.toString())
                            void router.push(
                                `${router.pathname}?${searchParamas.toString()}`
                            )
                        }}
                    >
                        <Pagination.Next>
                            <ChevronRight />
                        </Pagination.Next>
                        <Pagination.Previous>
                            <ChevronLeft />
                        </Pagination.Previous>
                    </Pagination>
                ) : (
                    <Loading mt={0.4} />
                )}
            </center>
        </Card>
    )

    const Product = ({ product }) => (
        <Grid key={product._id} xs={24} sm={12} md={8} xl={6}>
            <Link href={`/product/${product._id}`}>
                <a>
                    <Card
                        hoverable
                        width="100%"
                        height="100%"
                        style={{
                            backgroundColor: theme.palette.accents_1,
                        }}
                    >
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
                        <Button
                            mt={1}
                            width="100%"
                            icon={<ShoppingCart />}
                            style={{
                                backgroundColor: theme.palette.accents_1,
                            }}
                        >
                            ${product.price}
                        </Button>
                    </Card>
                </a>
            </Link>
        </Grid>
    )

    return (
        <Layout
            config={config}
            i18n={i18n}
            useThemeProvider={useThemeProvider}
            metaTitle={title}
        >
            <Grid.Container gap={1}>
                <Grid xs={24} md={12}>
                    <Select
                        style={{
                            minHeight: '3rem',
                            backgroundColor: theme.palette.accents_1,
                            minWidth: '100% !important',
                        }}
                        height="100%"
                        width="100%"
                        placeholder="Choose Category"
                        onChange={handler}
                    >
                        <Select.Option value="1">
                            <Code>Games</Code>
                        </Select.Option>
                        <Select.Option value="2">
                            <Code>Gift Cards</Code>
                        </Select.Option>
                    </Select>
                </Grid>
                <Grid xs={24} md={12}>
                    <Select
                        style={{
                            minHeight: '3rem',
                            backgroundColor: theme.palette.accents_1,
                            minWidth: '100% !important',
                        }}
                        placeholder="Choose Tags"
                        multiple
                        height="100%"
                        width="100%"
                    >
                        <Select.Option value="1">
                            <Code>React</Code>
                        </Select.Option>
                    </Select>
                </Grid>
                <Grid xs={24} md={12}>
                    <Select
                        style={{
                            minHeight: '3rem',
                            backgroundColor: theme.palette.accents_1,
                            minWidth: '100% !important',
                        }}
                        height="100%"
                        width="100%"
                        placeholder="Sort by"
                        onChange={handler}
                    >
                        <Select.Option value="1">
                            <Code>Games</Code>
                        </Select.Option>
                        <Select.Option value="2">
                            <Code>Gift Cards</Code>
                        </Select.Option>
                    </Select>
                </Grid>
                <Grid xs={24} md={12}>
                    <Paginated />
                </Grid>
                <Grid xs={24}>
                    <Divider h={1.5} my={2} width="100%" />
                </Grid>
                <Grid xs={24}>
                    <Grid.Container gap={1.5}>
                        {products ? (
                            <>
                                {products.map((product) => (
                                    <Product product={product} />
                                ))}
                                <Grid xs={24}>
                                    <Divider h={1.5} my={2} width="100%" />
                                </Grid>
                                <Grid xs={24}>
                                    <Paginated />
                                </Grid>
                            </>
                        ) : (
                            <>
                                {[...Array(15)].map((x, i) => (
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
                                            style={{
                                                backgroundColor:
                                                    theme.palette.accents_1,
                                            }}
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
            <style jsx global>
                {`
                    .PaginationCard > .content {
                        padding: 0.5rem !important;
                    }
                    .PaginationCard > .content > center > nav > li {
                        margin-bottom: 0rem !important;
                    }
                    .PaginationCard > .content > center > nav > li > button {
                        background: none;
                        color: ${theme.palette.accents_5}!important;
                    }
                    .PaginationCard > .content > center > nav > li > .active {
                        background: ${theme.palette.foreground};
                        color: ${theme.palette.background}!important;
                    }
                    .divider > span {
                        background-color: ${theme.type === 'dark'
                            ? config.theme.darkBackground
                            : config.theme.lightBackground} !important;
                        color: ${theme.palette.accents_4} !important;
                    }
                `}
            </style>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { page = 1, category = '', tags = [], sort = '' } = ctx.query

    return {
        props: { page: parseInt(page), category, tags, sort },
    }
}
