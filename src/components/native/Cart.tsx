import Link from 'next/link'

import Image from 'next/image'
import { CloseIcon, ImageSkeleton, Spinner } from 'components/native/icons'
import { Button } from 'components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from 'components/ui/card'
import { Badge } from 'components/ui/badge'
import type { CartItemWithVendorVariant } from 'types/prisma'
import { isVariableValid, validateBoolean } from 'lib/utils'
import { getCountInCart, getLocalCart, writeLocalCart } from 'lib/cart'
import { useState, useEffect } from 'react'
import { Cross2Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from 'hooks/useAccessToken'

export const CartGrid = () => {
    const { Authenticated, AccessToken } = useValidAccessToken()
    const [cartItems, setCartItems] = useState<
        CartItemWithVendorVariant[] | null
    >(null)
    const [vendorVariantId, setVendorVariantId] = useState('')
    const [fetchingCart, setFetchingCart] = useState(true)

    useEffect(() => {
        async function getCart() {
            try {
                if (Authenticated) {
                    const response = await fetch(`/api/cart`, {
                        headers: {
                            Authorization: `Bearer ${AccessToken}`,
                        },
                    })

                    const json = await response.json()
                    setCartItems(json?.cart?.items)
                    writeLocalCart(json?.cart?.items)
                    setFetchingCart(false)
                }

                if (!Authenticated) {
                    setCartItems(getLocalCart())
                    setFetchingCart(false)
                }
            } catch (error) {
                console.error({ error })
            }
        }

        getCart()
    }, [AccessToken, Authenticated])

    return (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
                {isVariableValid(cartItems)
                    ? cartItems.map((cartItem) => (
                          <CartVendorVariant
                              cartItems={cartItems}
                              cartItem={cartItem}
                              setFetchingCart={setFetchingCart}
                              fetchingCart={fetchingCart}
                              setCartItems={setCartItems}
                              key={vendorVariantId}
                          />
                      ))
                    : [...Array(5)].map(() => (
                          <CartVendorVariantSkeleton key={Math.random()} />
                      ))}
            </div>
            <Receipt />
        </div>
    )
}

function Receipt() {
    return (
        <Card>
            <CardHeader className="p-4 pb-0">
                <h2 className="font-bold tracking-tight">Receipt</h2>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
                <div className="flex justify-between">
                    <h2>Payable Amount:</h2>
                    <h3>$19.99 </h3>
                </div>
            </CardContent>
            <hr className="my-4 w-[80%] border-neutral-200 dark:border-neutral-800 sm:mx-auto" />

            <CardFooter>
                <Button className="w-full">Checkout</Button>
            </CardFooter>
        </Card>
    )
}

export const CartVendorVariant = ({
    cartItems,
    cartItem,
    setFetchingCart,
    fetchingCart,
    setCartItems,
}) => {
    const { Authenticated, AccessToken } = useValidAccessToken()

    const { vendorVariant, vendorVariantId, count } = cartItem

    function findLocalCartIndexById(array, vendorVariantId) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].vendorVariantId === vendorVariantId) {
                return i
            }
        }
        return -1
    }

    async function getVendorVariant() {
        try {
            const response = await fetch(`/api/vendor/variant`, {
                method: 'POST',
                body: JSON.stringify({ vendorVariantId }),
            })

            const json = await response.json()

            return json?.vendorVariant
        } catch (error) {
            console.error({ error })
        }
    }

    async function onAddToCart() {
        try {
            setFetchingCart(true)

            if (validateBoolean(Authenticated, true)) {
                const response = await fetch(`/api/cart/modify`, {
                    method:
                        getCountInCart({ cartItems, vendorVariantId }) > 0
                            ? 'PUT'
                            : 'POST',
                    body: JSON.stringify({ vendorVariantId }),
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const json = await response.json()

                setCartItems(json?.cart?.items)
                writeLocalCart(json?.cart?.items)
            }

            const localCart = getLocalCart() as any[]
            if (
                !Authenticated &&
                getCountInCart({ cartItems, vendorVariantId }) > 0
            ) {
                for (let i = 0; i < localCart.length; i++) {
                    if (localCart[i].vendorVariantId === vendorVariantId) {
                        localCart[i].count = localCart[i].count + 1
                    }
                }

                setCartItems(localCart)
                writeLocalCart(localCart)
            }

            if (
                !Authenticated &&
                getCountInCart({ cartItems, vendorVariantId }) < 1
            ) {
                localCart.push({
                    vendorVariantId,
                    vendorVariant: await getVendorVariant(),
                    count: 1,
                })

                writeLocalCart(localCart)
                setCartItems(localCart)
            }

            setFetchingCart(false)
        } catch (error) {
            console.error({ error })
        }
    }

    async function onRemoveFromCart() {
        try {
            setFetchingCart(true)

            if (Authenticated) {
                const response = await fetch(`/api/cart/modify`, {
                    method:
                        getCountInCart({ cartItems, vendorVariantId }) > 1
                            ? 'PATCH'
                            : 'DELETE',
                    body: JSON.stringify({ vendorVariantId }),
                    headers: {
                        Authorization: `Bearer ${AccessToken}`,
                    },
                })

                const json = await response.json()

                setCartItems(json?.cart?.items)
                writeLocalCart(json?.cart?.items)
                setFetchingCart(false)
            }

            const localCart = getLocalCart() as any[]
            const index = findLocalCartIndexById(localCart, vendorVariantId)
            const count = localCart[index].count

            if (
                !Authenticated &&
                getCountInCart({ cartItems, vendorVariantId }) > 1
            ) {
                localCart[index].count = count - 1

                setCartItems(localCart)
                writeLocalCart(localCart)
            }

            if (
                !Authenticated &&
                getCountInCart({ cartItems, vendorVariantId }) === 1
            ) {
                localCart.splice(index, 1)

                writeLocalCart(localCart)
                setCartItems(localCart)
            }

            setFetchingCart(false)
        } catch (error) {
            console.error({ error })
        }
    }

    function CartButton() {
        if (fetchingCart)
            return (
                <Button disabled>
                    <Spinner />
                </Button>
            )

        if (getCountInCart({ cartItems, vendorVariantId }) === 0) {
            return (
                <Button disabled={vendorVariantId == ''} onClick={onAddToCart}>
                    🛒 Add to Cart
                </Button>
            )
        }

        if (getCountInCart({ cartItems, vendorVariantId }) > 0) {
            return (
                <>
                    <Button
                        disabled={vendorVariantId == ''}
                        variant="outline"
                        size="icon"
                        onClick={onRemoveFromCart}
                    >
                        {getCountInCart({ cartItems, vendorVariantId }) == 1 ? (
                            <Cross2Icon className="h-4" />
                        ) : (
                            <MinusIcon className="h-4" />
                        )}
                    </Button>
                    <Button disabled variant="ghost" size="icon">
                        {getCountInCart({ cartItems, vendorVariantId })}
                    </Button>
                    <Button
                        disabled={vendorVariantId == ''}
                        variant="outline"
                        size="icon"
                        onClick={onAddToCart}
                    >
                        <PlusIcon className="h-4" />
                    </Button>
                </>
            )
        }
    }

    return (
        <Card>
            <CardHeader className="p-0 md:hidden">
                <div className="relative h-32 w-full">
                    <Link
                        href={`/product/${vendorVariant?.productVariant?.product?.id}`}
                    >
                        <Image
                            className="rounded-t-lg"
                            src={vendorVariant.productVariant.images[0]}
                            alt="product image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-6 gap-4 p-3">
                <div className="relative w-full col-span-2 hidden md:inline-flex">
                    <Link
                        href={`/product/${vendorVariant?.productVariant?.product?.id}`}
                    >
                        <Image
                            className="rounded-lg"
                            src={vendorVariant?.productVariant?.images[0]}
                            alt="item image"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Link>
                </div>
                <div className="col-span-4">
                    <Link
                        href={`/product/${vendorVariant?.productVariant?.product?.id}`}
                    >
                        <h2>{vendorVariant?.productVariant?.title}</h2>
                    </Link>
                    <p className="my-2 text-xs text-neutral-500 text-justify">
                        {vendorVariant?.productVariant?.description}
                    </p>
                    <h2 className="text-lg mb-4">${vendorVariant?.price}</h2>
                    <CartButton />
                </div>
            </CardContent>
        </Card>
    )
}

export function CartVendorVariantSkeleton() {
    return (
        <Link href="#">
            <div className="animate-pulse rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 mb-4">
                <div className="relative h-full w-full">
                    <div className="flex h-40 w-full items-center justify-center rounded bg-neutral-300 dark:bg-neutral-700 ">
                        <ImageSkeleton />
                    </div>
                </div>
                <div className="p-5">
                    <div className="w-full">
                        <div className="mb-4 h-2.5 w-48 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                        <div className="h-2 max-w-[360px] rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
