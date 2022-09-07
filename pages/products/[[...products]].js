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
    Collapse,
    Code,
    Badge,
    Tag,
} from '@geist-ui/core'

import { ShoppingCart, ChevronLeft, ChevronRight } from '@geist-ui/icons'
import essentials from '../../helpers/getEssentials'

import { handleProductsData } from 'aryana'

export default function ({ currentPage, category, tags, sort }) {
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
    const { setMeta } = useMeta()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config['defaultLocale'] } = useRouter()
    const { title, description } = i18n['pages']['products']

    const [keyword, setKeyword] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    useEffect(() => {}, [])

    useEffect(() => {
        async function resolve() {
            const response = await axios.post(
                config.routes.backend.products,
                {
                    currentPage,
                },
                config.axios.simple
            )

            handleProductsData({
                response,
                router,
                setTotalPages,
                setProducts,
                setToast,
                noDataToast: i18n['toasts']['noData'][locale],
            })
        }

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    return (
        <Grid.Container gap={1}>
            <Filters />
            <ProductGrid products={products} />
            <Paginated totalPages={totalPages} currentPage={currentPage} />
        </Grid.Container>
    )
}

const ProductGrid = ({ products }) => {
    const theme = useTheme()

    return (
        <Grid xs={24}>
            <Grid.Container gap={1.5}>
                {products ? (
                    <>
                        {products.map((product) => (
                            <Product key={product._id} product={product} />
                        ))}
                        <Grid xs={24}>
                            <Divider h={1.5} my={2} width="100%" />
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
    )
}

const Paginated = ({ totalPages, currentPage }) => {
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

    return (
        <Grid xs={24}>
            <Card className="PaginationCard" width="100%">
                <center>
                    {totalPages ? (
                        <Pagination
                            width="100%"
                            count={totalPages}
                            initialPage={currentPage}
                            limit={6}
                            onChange={(num) => {
                                if (num === currentPage) {
                                    return
                                }

                                const searchParamas = new URLSearchParams(
                                    router.query
                                )
                                searchParamas.set('page', num.toString())
                                void router.push(
                                    `${
                                        router.pathname
                                    }?${searchParamas.toString()}`
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
                <style jsx global>
                    {`
                        .PaginationCard > .content {
                            padding: 0.5rem !important;
                        }
                        .PaginationCard > .content > center > nav > li {
                            margin-bottom: 0rem !important;
                        }
                        .PaginationCard
                            > .content
                            > center
                            > nav
                            > li
                            > button {
                            background: none;
                            color: ${theme.palette.accents_5}!important;
                        }
                        .PaginationCard
                            > .content
                            > center
                            > nav
                            > li
                            > .active {
                            background: ${theme.palette.foreground};
                            color: ${theme.palette.background}!important;
                        }
                    `}
                </style>
            </Card>
        </Grid>
    )
}

const Product = ({ product }) => {
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

    return (
        <Grid width="100%" key={product._id} xs={24} sm={12} md={8} xl={6}>
            <Link width="100%" href={`/product/${product._id}`}>
                <a style={{ width: '100%' }}>
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
                            width="100%"
                            src={product.images[0]}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <Card.Body
                            style={{
                                display: 'block',
                                justifyContent: 'space-between',
                                margin: '0 0',
                            }}
                            width="100%"
                        >
                            <div>
                                {product.listings &&
                                    product.listings.map((listing) => {
                                        const { category } = product

                                        return (
                                            category && (
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            theme.palette
                                                                .accents_6,
                                                        color: theme.palette
                                                            .background,
                                                    }}
                                                    mr={0.5}
                                                    mb={0}
                                                    px="0.7rem"
                                                    scale={0.8}
                                                    key={Math.random()}
                                                >
                                                    {category}
                                                </Badge>
                                            )
                                        )
                                    })}
                                {product.tags &&
                                    product.tags.map((tag) => {
                                        return (
                                            <Badge
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.accents_2,
                                                    color: theme.palette
                                                        .foreground,
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
                                    })}
                                <Text font="1rem" mb={0}>
                                    {product.title}
                                </Text>
                            </div>

                            <Button
                                mt={1}
                                width="100%"
                                icon={<ShoppingCart />}
                                style={{
                                    backgroundColor: theme.palette.accents_1,
                                }}
                            >
                                ${product['listings'][0]['price']}
                            </Button>
                        </Card.Body>
                    </Card>
                </a>
            </Link>
        </Grid>
    )
}

const Filters = ({}) => {
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
    const { locale = config['defaultLocale'] } = useRouter()

    const handler = (val) => {}

    return (
        <>
            <Card
                py={0}
                width="100%"
                style={{ backgroundColor: theme.palette.accents_1 }}
            >
                <Card.Body py={0}>
                    <Collapse.Group my={0}>
                        <Collapse
                            title={
                                i18n['pages']['products']['filter']['title'][
                                    locale
                                ]
                            }
                            subtitle={
                                i18n['pages']['products']['filter']['subtitle'][
                                    locale
                                ]
                            }
                            style={{ borderBottom: 'none' }}
                            my={0}
                        >
                            <Grid.Container gap={1}>
                                <Grid xs={24} md={12}>
                                    <Select
                                        style={{
                                            minHeight: '3rem',
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
                                <Grid xs={24}>
                                    <Select
                                        style={{
                                            minHeight: '3rem',
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
                            </Grid.Container>
                        </Collapse>
                    </Collapse.Group>
                </Card.Body>
            </Card>
            <Grid xs={24}>
                <Divider h={1.5} my={2} width="100%" />
            </Grid>
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { page = 1, category = '', tags = [], sort = '' } = ctx.query

    return {
        props: { currentPage: parseInt(page), category, tags, sort },
    }
}
