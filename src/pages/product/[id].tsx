import { useState, useEffect } from 'react'
import Link from 'next/link'

import Image from 'next/image'

import Meta from 'components/native/Meta'
import prisma from 'lib/prisma'
import { ChevronRightIcon, HomeIcon } from '@radix-ui/react-icons'
import { Button } from 'components/ui/button'
import { useValidAccessToken } from 'hooks/useAccessToken'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'components/ui/select'
import { isVariableValid } from 'lib/utils'
import { Spinner } from 'components/native/icons'

export default function Product({ unserialized }) {
    const [product, setProduct] = useState(JSON.parse(unserialized) || null)

    return (
        <>
            {isVariableValid(product) && (
                <>
                    <Meta
                        title={product.title || 'Product'}
                        description={product.description || 'Product Page'}
                        image={product.images[0]}
                        canonical={process.env.NEXT_PUBLIC_URL}
                    />
                    <Breadcrumbs product={product} />
                    <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3">
                        <ImageColumn product={product} />
                        <DataColumn product={product} />
                    </div>
                </>
            )}
        </>
    )
}

const DataColumn = ({ product }) => {
    const { AccessToken } = useValidAccessToken()
    const [cart, setCart] = useState(null)
    const [wishlist, setWishlist] = useState(null)
    const [variantId, setVariantId] = useState('')
    const [fetchingCart, setFetchingCart] = useState(true)
    const [fetchingWishlist, setFetchingWishlist] = useState(true)

    useEffect(() => {
        async function getCart() {
            try {
                const answer = await fetch(`/api/cart`, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const {
                    cart: { items },
                } = await answer.json()

                setCart(items)
                setFetchingCart(false)
            } catch (error) {}
        }

        async function getWishlist() {
            try {
                const answer = await fetch(`/api/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const {
                    wishlist: { items },
                } = await answer.json()

                setWishlist(items)
                setFetchingWishlist(false)
            } catch (error) {}
        }

        if (isVariableValid(AccessToken)) getCart()
        if (isVariableValid(AccessToken)) getWishlist()
    }, [AccessToken])

    function isVariantInArray(array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === variantId) {
                return true
            }
        }
        return false
    }

    async function onAddToCart() {
        try {
            setFetchingCart(true)

            const response = await fetch(`/api/cart/modify`, {
                method: 'POST',
                body: JSON.stringify({ variantId }),
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            setCart(json?.cart?.items)
            setFetchingCart(false)
        } catch (error) {
            console.error({ error })
        }
    }

    async function onRemoveFromCart() {
        try {
            setFetchingCart(true)

            const response = await fetch(`/api/cart/modify`, {
                method: 'DELETE',
                body: JSON.stringify({ variantId }),
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            setCart(json?.cart?.items)
            setFetchingCart(false)
        } catch (error) {
            console.error({ error })
        }
    }

    async function onAddToWishlist() {
        try {
            setFetchingWishlist(true)

            const response = await fetch(`/api/wishlist/modify`, {
                method: 'POST',
                body: JSON.stringify({ variantId }),
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            const items = json?.wishlist?.items

            setWishlist(items)
            setFetchingWishlist(false)
        } catch (error) {
            console.error({ error })
        }
    }

    async function onRemoveFromWishlist() {
        try {
            setFetchingWishlist(true)

            const response = await fetch(`/api/wishlist/modify`, {
                method: 'DELETE',
                body: JSON.stringify({ variantId }),
                headers: {
                    Authorization: `Bearer ${AccessToken}`,
                },
            })

            const json = await response.json()

            const items = json?.wishlist?.items

            setWishlist(items)
            setFetchingWishlist(false)
        } catch (error) {
            console.error({ error })
        }
    }

    return (
        <div className="col-span-2 w-full rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900">
            <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                {product.title}
            </h3>
            <small className="text-black dark:text-white">
                {product.description}
            </small>
            <hr className="my-4 h-px w-64 border-0 bg-neutral-300 dark:bg-neutral-600" />
            <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
                Select an option
            </label>
            <Select onValueChange={(e) => setVariantId(e)}>
                <SelectTrigger className="w-[50%] my-3">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {product.variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                            {variant.title} - ${variant.price}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {isVariableValid(cart) && isVariableValid(wishlist) && (
                <div className="flex gap-2">
                    {fetchingCart ? (
                        <Button disabled>
                            <Spinner />
                        </Button>
                    ) : isVariantInArray(cart) ? (
                        <Button
                            disabled={variantId == ''}
                            onClick={onRemoveFromCart}
                        >
                            🛒 Remove from Cart
                        </Button>
                    ) : (
                        <Button
                            disabled={variantId == ''}
                            onClick={onAddToCart}
                        >
                            🛒 Add to Cart
                        </Button>
                    )}
                    {fetchingWishlist ? (
                        <Button disabled>
                            <Spinner />
                        </Button>
                    ) : isVariantInArray(wishlist) ? (
                        <Button
                            disabled={variantId == ''}
                            onClick={onRemoveFromWishlist}
                        >
                            🤍 Remove from Wishlist
                        </Button>
                    ) : (
                        <Button
                            disabled={variantId == ''}
                            onClick={onAddToWishlist}
                        >
                            🤍 Add to Wishlist
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

const ImageColumn = ({ product }) => {
    return (
        <div className="relative w-full col-span-1">
            <Image
                src={product['variants'][0]['images'][0]}
                alt="Product Image"
                fill
                className="rounded-lg"
                style={{ objectFit: 'cover' }}
            />
        </div>
    )
}

const Breadcrumbs = ({ product }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRightIcon />
                        <Link
                            className="ml-1 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white md:ml-2"
                            href="/products"
                        >
                            Products
                        </Link>
                    </div>
                </li>
                <li aria-current="page">
                    <div className="flex items-center">
                        <ChevronRightIcon />
                        <span className="ml-1 text-sm font-medium text-neutral-500 dark:text-neutral-400 md:ml-2">
                            {product.title || '---'}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                categories: true,
            },
        })
        return {
            props: { unserialized: JSON.stringify(product) },
        }
    } catch (error) {
        return { props: {} }
    }
}
