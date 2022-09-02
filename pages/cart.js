import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Trash, Plus, Minus, CreditCard } from '@geist-ui/icons'
import {
    Text,
    ButtonGroup,
    Button,
    Image,
    Divider,
    Loading,
    Card,
    Grid,
    useTheme,
    useToasts,
    Select,
    Input,
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

    const folio = i18n['pages']['cart']
    const title = folio['title'][locale]
    const description = folio['description'][locale]

    const [cart, setCart] = useState(null)

    useEffect(() => {
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

        resolve()
    }, [])

    async function Add(listingID) {
        const response = await axios.post(
            config.backend.routes.addCart,
            { listingID },
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

    async function Subtract(listingID) {
        const response = await axios.post(
            config.backend.routes.subtractCart,
            { listingID },
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

    async function Remove(listingID) {
        const response = await axios.post(
            config.backend.routes.removeCart,
            { listingID },
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

    const Product = ({ product, listing, count }) => {
        return (
            <Grid style={{ height: 'max-content', minHeight: '100pt' }} xs={24}>
                <Grid.Container gap={1}>
                    <Grid xs={24}>
                        <Card
                            width="100%"
                            pb={0}
                            style={{
                                backgroundColor: theme.palette.accents_1,
                                height: 'max-content',
                                minHeight: '100pt',
                            }}
                        >
                            <Card.Body height="100%" width="100%">
                                <Grid.Container gap={1}>
                                    <Grid xs={6}>
                                        <Card
                                            width="100%"
                                            height="100%"
                                            style={{
                                                backgroundImage: `url(${product.images[0]})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        />
                                    </Grid>
                                    <Grid style={{ display: 'block' }} xs={18}>
                                        <Text mt={0} mb={0.3} font="1.2rem">
                                            {product.title}
                                        </Text>
                                        <Text mt={0} font={0.8}>
                                            <Text span type="secondary">
                                                {`Price:  `}
                                            </Text>
                                            <b>{listing.price}</b>,
                                            <Text
                                                ml={0.5}
                                                span
                                                type="secondary"
                                            >
                                                {`Count:  `}
                                            </Text>
                                            <b>{count}</b>,
                                            <Text
                                                ml={0.5}
                                                span
                                                type="secondary"
                                            >
                                                {`Platform:  `}
                                            </Text>
                                            <b>
                                                {listing[
                                                    'platform'
                                                ].toUpperCase()}
                                            </b>
                                            ,
                                            <Text
                                                ml={0.5}
                                                span
                                                type="secondary"
                                            >
                                                {`Region:  `}
                                            </Text>
                                            <b>
                                                {listing[
                                                    'region'
                                                ].toUpperCase()}
                                            </b>
                                        </Text>
                                        <ButtonGroup>
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.accents_1,
                                                }}
                                                auto
                                                scale={0.5}
                                                px={1.5}
                                                icon={<Trash />}
                                                onClick={() =>
                                                    Remove(listing._id)
                                                }
                                            />
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.accents_1,
                                                }}
                                                auto
                                                disbaled={count < 2}
                                                scale={0.5}
                                                px={1.5}
                                                icon={<Minus />}
                                                onClick={() =>
                                                    Subtract(listing._id)
                                                }
                                            />
                                            <Button
                                                style={{
                                                    backgroundColor:
                                                        theme.palette.accents_1,
                                                }}
                                                auto
                                                scale={0.5}
                                                px={1.5}
                                                icon={<Plus />}
                                                onClick={() => Add(listing._id)}
                                            />
                                        </ButtonGroup>
                                    </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Grid>
        )
    }

    const Receipt = ({}) => {
        return (
            <Card
                width="100%"
                style={{
                    backgroundColor: theme.palette.accents_1,
                    height: 'max-content',
                }}
            >
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Text mb={0} type="secondary">
                        TOTAL COST
                    </Text>
                    <Text mb={0}></Text>
                </div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Text mb={0} type="secondary">
                        DISCOUNT
                    </Text>
                    <Text mb={0}></Text>
                </div>
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Text mb={0} type="secondary">
                        PAYABLE
                    </Text>
                    <Text mb={0}></Text>
                </div>
                <Divider my={3} />
                <Text small type="secondary">
                    ADDRESS
                </Text>
                <Select
                    width="100%"
                    mb={1}
                    placeholder="Choose address."
                    disabled
                >
                    <Select.Option value="1">Option 1</Select.Option>
                    <Select.Option value="2">Option 2</Select.Option>
                </Select>
                <Text small type="secondary">
                    REFERRAL CODE
                </Text>
                <Input mb={1} width="100%" placeholder="Input referral code." />
                <Text small type="secondary">
                    DISCOUNT CODE
                </Text>
                <Input mb={1} width="100%" placeholder="Input discount code." />
                <Divider my={3} />
                <Button width="100%" type="secondary" icon={<CreditCard />}>
                    Pay
                </Button>
            </Card>
        )
    }

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
                        <Grid xs={24} md={16}>
                            <Grid.Container
                                style={{ height: 'max-content' }}
                                gap={1}
                            >
                                {cart.map(({ listing, product, count }) => {
                                    return (
                                        <Product
                                            key={product._id}
                                            listing={listing}
                                            product={product}
                                            count={count}
                                        />
                                    )
                                })}
                            </Grid.Container>
                        </Grid>
                        <Grid xs={24} md={0}>
                            <Divider width="100%" />
                        </Grid>
                        <Grid xs={24} md={8}>
                            <Receipt />
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
