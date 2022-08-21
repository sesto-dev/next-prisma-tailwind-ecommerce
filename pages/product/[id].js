import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight, ShoppingCart } from '@geist-ui/icons'
import { useEffect, useState } from 'react'
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

import Layout from '../../components/Layout'
import { useThemeProvider } from '../../state/Theme'
import { handleProductData } from '../../handlers/ProductHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function ({ id }) {
    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config.defaultLocale } = router

    const folio = i18n['root']['product']
    const description = folio['description'][locale]

    const [product, setProduct] = useState({})
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState(folio['title'][locale])

    async function resolve() {
        const route = config.backend.routes.products + `/${id}`
        const response = await axios.get(route)

        handleProductData({
            response,
            router,
            setTitle,
            setImage,
            setProduct,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    const handler = (val) => {}

    useEffect(() => {
        resolve()
    }, [])

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
                    {product ? (
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
                                    <Link href="/products">
                                        <a>
                                            <Breadcrumbs.Item>
                                                Products
                                            </Breadcrumbs.Item>
                                        </a>
                                    </Link>
                                    <Breadcrumbs.Item>
                                        {product.name}
                                    </Breadcrumbs.Item>
                                </Breadcrumbs>
                            </Grid>
                            <Grid xs={24} md={9}>
                                <Image
                                    src={product.image}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        objectFit: 'cover',
                                    }}
                                />
                            </Grid>
                            <Grid xs={24} md={15}>
                                <Card
                                    style={{
                                        backgroundColor: `${theme.palette.accents_1}`,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Description
                                        title="Title"
                                        content={
                                            <Text font="1.4rem">
                                                {product.name}
                                            </Text>
                                        }
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
                                            product.versions &&
                                            product.versions.map((version) => {
                                                return (
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
                                                        {version.platform &&
                                                            version.platform}
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
                                                                theme.palette
                                                                    .accents_2,
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
                                            placeholder="Choose Version"
                                            onChange={handler}
                                            mb={0.7}
                                        >
                                            {product.versions &&
                                                product.versions.map(
                                                    (version, index) => {
                                                        return (
                                                            <Select.Option
                                                                key={index}
                                                                value={index}
                                                            >
                                                                {'platform: '}
                                                                <Code>
                                                                    {
                                                                        version.platform
                                                                    }
                                                                </Code>
                                                                {', region: '}
                                                                <Code>
                                                                    {
                                                                        version.region
                                                                    }
                                                                </Code>
                                                                {', price: '}
                                                                <Code>
                                                                    {
                                                                        version.price
                                                                    }
                                                                </Code>
                                                            </Select.Option>
                                                        )
                                                    }
                                                )}
                                        </Select>
                                        <Button
                                            width="100%"
                                            icon={<ShoppingCart />}
                                            type="secondary"
                                        >
                                            {product.versions &&
                                                product['versions'][0]['price']}
                                        </Button>
                                    </div>
                                </Card>
                            </Grid>
                            <Grid xs={24}>
                                <Card
                                    style={{
                                        backgroundColor: `${theme.palette.accents_1}`,
                                    }}
                                >
                                    <Collapse.Group>
                                        <Collapse
                                            title="Question A"
                                            initialVisible
                                        >
                                            <Text>
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat.
                                            </Text>
                                        </Collapse>
                                        <Collapse
                                            style={{ borderBottom: 'none' }}
                                            title="Question B"
                                        >
                                            <Text>
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat.
                                            </Text>
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
                    .btn-group > button {
                        width: 100% !important;
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
