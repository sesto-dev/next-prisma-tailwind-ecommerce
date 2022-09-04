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

import { Layout, handleProductsData } from 'aryana'

export default function ({ page, category, tags, sort }) {
    const {
        config,
        i18n,
        useThemeProvider,
        useAuth,
        useRouter,
        Link,
        Head,
        axios,
    } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config['defaultLocale'] } = useRouter()
    const folio = i18n['pages']['products']

    const [keyword, setKeyword] = useState(null)
    const [pages, setPages] = useState(null)
    const [products, setProducts] = useState(null)

    useEffect(() => {
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

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handler = (val) => {}

    const Paginated = () => (
        <Card style={{}} className="PaginationCard" width="100%">
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

    const Filters = ({}) => (
        <Card
            py={0}
            width="100%"
            style={{ backgroundColor: theme.palette.accents_1 }}
        >
            <Card.Body py={0}>
                <Collapse.Group my={0}>
                    <Collapse
                        title={folio['filter']['title'][locale]}
                        subtitle={folio['filter']['subtitle'][locale]}
                        style={{ borderBottom: 'none' }}
                        my={0}
                    >
                        <Grid.Container gap={1}>
                            <Grid xs={12}>
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
                            <Grid xs={12}>
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
    )

    return (
        <Layout
            essentials={essentials}
            metaTitle={folio['title'][locale]}
            metaDescription={folio['description'][locale]}
        >
            <Grid.Container gap={1}>
                <Filters />
                <Grid xs={24}>
                    <Divider h={1.5} my={2} width="100%" />
                </Grid>
                <Grid xs={24}>
                    <Grid.Container gap={1.5}>
                        {products ? (
                            <>
                                {products.map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    />
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
