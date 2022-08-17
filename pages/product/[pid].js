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
import { handleProductData } from '../../handlers/productHandlers'

import config from '../../config/main.config'
import i18n from '../../config/i18n.config'

export default function ({ pid }) {
    const theme = useTheme()
    const router = useRouter()
    const { locale = config.defaultLocale } = router
    const { setToast } = useToasts()

    const folio = i18n['root']['product']
    const description = folio['description'][locale]

    const [product, setProduct] = useState({})
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState(folio['title'][locale])

    async function resolve() {
        const route = config.backend.routes.products + `/${pid}`
        const response = await axios.get(route)

        handleProductData(
            response,
            router,
            setTitle,
            setImage,
            setProduct,
            setToast,
            i18n['toasts']['noDataReceived'][locale]
        )
    }

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
                                <Card
                                    style={{
                                        backgroundColor: `${theme.palette.accents_1}`,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Image
                                        height="50vh"
                                        src={product.image}
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                    <Text
                                        mb={0.2}
                                        style={{ fontSize: '1.3rem' }}
                                    >
                                        {product.name}
                                    </Text>
                                    <Text small type="secondary">
                                        {product.description}
                                    </Text>
                                </Card>
                            </Grid>
                            <Grid xs={24} md={15}>
                                <Card
                                    style={{
                                        backgroundColor: `${theme.palette.accents_1}`,
                                    }}
                                    width="100%"
                                    height="100%"
                                >
                                    <Text
                                        mb={0.2}
                                        style={{ fontSize: '1.5rem' }}
                                    >
                                        {product.name}
                                    </Text>
                                    <Text small type="secondary">
                                        {product.description}
                                    </Text>
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
    const { pid } = context.query

    return {
        props: { pid }, // will be passed to the page component as props
    }
}
