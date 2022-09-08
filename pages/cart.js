import { getLocaleAlignment, getLocaleDirection, handleCartData } from 'aryana'
import { useEffect, useState } from 'react'

import { Trash, Plus, Minus, CreditCard, Unlock, X } from '@geist-ui/icons'
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

import essentials from '../helpers/getEssentials'

export default function () {
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

    const { setMeta } = useMeta()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config.defaultLocale } = router
    const { title, description } = i18n['pages']['cart']

    const [cart, setCart] = useState(null)

    useEffect(() => {
        setMeta({
            title: title[locale],
            description: description[locale],
        })
    }, [locale])

    useEffect(() => {
        async function resolve() {
            const response = await axios.get(config.routes.backend.getCart)

            handleCartData({
                response,
                router,
                setCart,
                setToast,
                noDataToast: i18n['toasts']['noData'][locale],
            })
        }

        resolve()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid.Container gap={2}>
            <Items cart={cart} setCart={setCart} />
            <Receipt cart={cart} setCart={setCart} />
        </Grid.Container>
    )
}

const Receipt = ({ cart, setCart }) => {
    const { config, i18n, useRouter, axios } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const { locale = config.defaultLocale } = router

    const [discountCode, setDiscountCode] = useState('')
    const [referralCode, setReferralCode] = useState('')

    useEffect(() => {
        if (cart && cart.discountCode) setDiscountCode(cart.discountCode)
        if (cart && cart.referralCode) setReferralCode(cart.referralCode)
    }, [cart])

    async function onAddDiscountCode() {
        const response = await axios.post(
            config.routes.backend.discount,
            { discountCode },
            config.axios.simple
        )

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    async function onRemoveDiscountCode() {
        const response = await axios.delete(config.routes.backend.discount)

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })

        setDiscountCode('')
    }

    async function onAddReferralCode() {
        const response = await axios.post(
            config.routes.backend.referral,
            { referralCode },
            config.axios.simple
        )

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    async function onRemoveReferralCode() {
        const response = await axios.delete(config.routes.backend.referral)

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })

        setReferralCode('')
    }

    return (
        <Grid xs={24} md={8}>
            <Card
                width="100%"
                style={{
                    backgroundColor: theme.palette.accents_1,
                    height: 'max-content',
                }}
            >
                {cart ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text mb={0} type="secondary">
                                {
                                    i18n['pages']['cart']['receipt']['total'][
                                        locale
                                    ]
                                }
                            </Text>
                            <Text mb={0}>{cart.totalCost}</Text>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text mb={0} type="secondary">
                                {
                                    i18n['pages']['cart']['receipt'][
                                        'discounted'
                                    ][locale]
                                }
                            </Text>
                            <Text mb={0}>{cart.discountCost}</Text>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text mb={0} type="secondary">
                                {
                                    i18n['pages']['cart']['receipt']['payable'][
                                        locale
                                    ]
                                }
                            </Text>
                            <Text mb={0}>{cart.payableCost}</Text>
                        </div>
                        <Divider my={3} />
                        {cart.hasPhysical && (
                            <>
                                <Text small type="secondary">
                                    {
                                        i18n['pages']['cart']['receipt'][
                                            'address'
                                        ][locale]
                                    }
                                </Text>
                                <Select
                                    width="100%"
                                    mb={1}
                                    placeholder="Choose address."
                                    disabled
                                >
                                    <Select.Option value="1">
                                        Option 1
                                    </Select.Option>
                                    <Select.Option value="2">
                                        Option 2
                                    </Select.Option>
                                </Select>
                            </>
                        )}
                        <Text
                            style={{
                                direction: getLocaleDirection(locale),
                                textAlign: getLocaleAlignment(locale),
                            }}
                            small
                            type="secondary"
                        >
                            {i18n['inputs']['referralCode']['label'][locale]}
                        </Text>
                        <Grid.Container gap={1}>
                            <Grid xs={18}>
                                <Input
                                    mb={1}
                                    width="100%"
                                    placeholder={
                                        i18n['inputs']['referralCode'][
                                            'placeholder'
                                        ][locale]
                                    }
                                    disabled={cart && cart.referralCode}
                                    value={referralCode}
                                    onChange={(e) =>
                                        setReferralCode(e.target.value.trim())
                                    }
                                />
                            </Grid>
                            <Grid xs={6}>
                                <Button
                                    disabled={!referralCode}
                                    type="secondary"
                                    height="2.25rem"
                                    width="100%"
                                    icon={
                                        cart && cart.referralCode ? (
                                            <X />
                                        ) : (
                                            <Unlock />
                                        )
                                    }
                                    onClick={() => {
                                        if (!cart.referralCode)
                                            onAddReferralCode()
                                        if (cart && cart.referralCode)
                                            onRemoveReferralCode()
                                    }}
                                />
                            </Grid>
                        </Grid.Container>
                        <Text small type="secondary">
                            {i18n['inputs']['discountCode']['label'][locale]}
                        </Text>
                        <Grid.Container gap={1}>
                            <Grid xs={18}>
                                <Input
                                    width="100%"
                                    placeholder={
                                        i18n['inputs']['discountCode'][
                                            'placeholder'
                                        ][locale]
                                    }
                                    disabled={cart && cart.discountCode}
                                    value={discountCode}
                                    type={cart.discountCode && 'success'}
                                    onChange={(e) =>
                                        setDiscountCode(e.target.value.trim())
                                    }
                                />
                            </Grid>
                            <Grid xs={6}>
                                <Button
                                    disabled={!discountCode}
                                    type="secondary"
                                    height="2.25rem"
                                    width="100%"
                                    icon={
                                        cart && cart.discountCode ? (
                                            <X />
                                        ) : (
                                            <Unlock />
                                        )
                                    }
                                    onClick={() => {
                                        if (!cart.discountCode)
                                            onAddDiscountCode()
                                        if (cart && cart.discountCode)
                                            onRemoveDiscountCode()
                                    }}
                                />
                            </Grid>
                        </Grid.Container>
                        <Divider my={3} />
                        <Button
                            mb={0.6}
                            width="100%"
                            type="secondary"
                            icon={<CreditCard />}
                        >
                            {i18n['buttons']['payment'][locale]}
                        </Button>
                    </>
                ) : (
                    <Loading />
                )}
            </Card>
        </Grid>
    )
}

const Items = ({ cart, setCart }) => {
    const theme = useTheme()

    return (
        <>
            <Grid xs={24} md={16}>
                <Grid.Container style={{ height: 'max-content' }} gap={1}>
                    {cart ? (
                        cart.items.map(({ listing, product, count }) => {
                            return (
                                <Product
                                    key={product._id}
                                    listing={listing}
                                    product={product}
                                    count={count}
                                    cart={cart}
                                    setCart={setCart}
                                />
                            )
                        })
                    ) : (
                        <Grid
                            style={{
                                height: 'max-content',
                            }}
                            xs={24}
                        >
                            <Card
                                width="100%"
                                style={{
                                    backgroundColor: theme.palette.accents_1,
                                    height: 'max-content',
                                }}
                            >
                                <Loading />
                            </Card>
                        </Grid>
                    )}
                </Grid.Container>
            </Grid>
            <Grid xs={24} md={0}>
                <Divider width="100%" />
            </Grid>
        </>
    )
}

const Product = ({ product, listing, count, cart, setCart }) => {
    const { config, i18n, useRouter, Link, axios } = essentials

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()
    const { locale = config.defaultLocale } = router

    async function onAdd(listingID) {
        const response = await axios.post(
            config.routes.backend.addCart,
            { listingID },
            config.axios.simple
        )

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    async function onSubtract(listingID) {
        const response = await axios.post(
            config.routes.backend.subtractCart,
            { listingID },
            config.axios.simple
        )

        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

    async function onRemove(listingID) {
        const response = await axios.post(
            config.routes.backend.removeCart,
            { listingID },
            config.axios.simple
        )
        handleCartData({
            response,
            router,
            setCart,
            setToast,
            noDataToast: i18n['toasts']['noData'][locale],
        })
    }

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
                                    <Link href={`/product/${product._id}`}>
                                        <a
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            <Card
                                                width="100%"
                                                height="100%"
                                                style={{
                                                    backgroundImage: `url(${product.images[0]})`,
                                                    backgroundPosition:
                                                        'center',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                }}
                                            />
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid style={{ display: 'block' }} xs={18}>
                                    <Link href={`/product/${product._id}`}>
                                        <Text mt={0} mb={0.3} font="1.2rem">
                                            <a className="Peculiar">
                                                {product.title}
                                            </a>
                                        </Text>
                                    </Link>
                                    <Text mt={0} font={0.8}>
                                        <Text span type="secondary">
                                            {`Price:  `}
                                        </Text>
                                        <b>{listing.price}</b>,
                                        <Text ml={0.5} span type="secondary">
                                            {`Count:  `}
                                        </Text>
                                        <b>{count}</b>,
                                        <Text ml={0.5} span type="secondary">
                                            {`Platform:  `}
                                        </Text>
                                        <b>
                                            {listing['platform'].toUpperCase()}
                                        </b>
                                        ,
                                        <Text ml={0.5} span type="secondary">
                                            {`Region:  `}
                                        </Text>
                                        <b>{listing['region'].toUpperCase()}</b>
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
                                                onRemove(listing._id)
                                            }
                                        />
                                        <Button
                                            style={{
                                                backgroundColor:
                                                    theme.palette.accents_1,
                                            }}
                                            auto
                                            disabled={count < 2}
                                            scale={0.5}
                                            px={1.5}
                                            icon={<Minus />}
                                            onClick={() =>
                                                onSubtract(listing._id)
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
                                            onClick={() => onAdd(listing._id)}
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
