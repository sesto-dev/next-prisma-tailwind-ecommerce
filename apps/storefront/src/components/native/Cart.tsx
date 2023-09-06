import Link from 'next/link'

import Image from 'next/image'
import { CloseIcon, ImageSkeleton, Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { isVariableValid, validateBoolean } from '@/lib/utils'
import { getCountInCart, getLocalCart, writeLocalCart } from '@/lib/cart'
import { useState, useEffect } from 'react'
import { Cross2Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useValidAccessToken } from '@/hooks/useAccessToken'
import { useCartContext } from '@/state/Cart'

export const CartGrid = () => {
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()

   if (isVariableValid(cart?.items) && cart?.items?.length === 0) {
      return (
         <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
               <Card>
                  <CardContent className="p-4">
                     <p>Your Cart is empty...</p>
                  </CardContent>
               </Card>
            </div>
            <Receipt />
         </div>
      )
   }

   return (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
         <div className="md:col-span-2">
            {isVariableValid(cart?.items)
               ? cart?.items?.map((cartItem, index) => (
                    <CartProduct cartItem={cartItem} key={index} />
                 ))
               : [...Array(5)].map((cartItem, index) => (
                    <CartProductSkeleton key={index} />
                 ))}
         </div>
         <Receipt />
      </div>
   )
}

function Receipt() {
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()

   function calculatePayableCost() {
      let payableCost = 0

      if (isVariableValid(cart?.items)) {
         for (const item of cart?.items) {
            payableCost += item.count * item?.product?.price
         }
      }

      return payableCost
   }

   return (
      <Card className={loading && 'animate-pulse'}>
         <CardHeader className="p-4 pb-0">
            <h2 className="font-bold tracking-tight">Receipt</h2>
         </CardHeader>
         <CardContent className="grid gap-4 p-4">
            <div className="flex justify-between">
               <h2>Payable Amount:</h2>
               <h3>${calculatePayableCost()}</h3>
            </div>
         </CardContent>
         <hr className="my-4 w-[80%] border-neutral-200 dark:border-neutral-800 sm:mx-auto" />

         <CardFooter>
            <Button
               disabled={
                  !isVariableValid(cart?.items) || cart['items'].length === 0
               }
               className="w-full"
            >
               Checkout
            </Button>
         </CardFooter>
      </Card>
   )
}

export const CartProduct = ({ cartItem }) => {
   const { AccessToken } = useValidAccessToken()
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()
   const [fetchingCart, setFetchingCart] = useState(false)

   const { product, productId, count } = cartItem

   function findLocalCartIndexById(array, productId) {
      for (let i = 0; i < array.length; i++) {
         if (array?.items[i]?.productId === productId) {
            return i
         }
      }
      return -1
   }

   async function getProduct() {
      try {
         const response = await fetch(`/api/product`, {
            method: 'POST',
            body: JSON.stringify({ productId }),
            headers: {
               'Content-Type': 'application/json-string',
            },
         })

         const json = await response.json()

         return json?.product
      } catch (error) {
         console.error({ error })
      }
   }

   async function onAddToCart() {
      try {
         setFetchingCart(true)

         if (isVariableValid(AccessToken)) {
            const response = await fetch(`/api/cart/modify`, {
               method:
                  getCountInCart({
                     cartItems: cart?.items,
                     productId,
                  }) > 0
                     ? 'PUT'
                     : 'POST',
               body: JSON.stringify({ productId }),
               headers: {
                  'Content-Type': 'application/json-string',
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any

         if (
            !isVariableValid(AccessToken) &&
            getCountInCart({ cartItems: cart?.items, productId }) > 0
         ) {
            for (let i = 0; i < localCart.items.length; i++) {
               if (localCart.items[i].productId === productId) {
                  localCart.items[i].count = localCart.items[i].count + 1
               }
            }

            dispatchCart(localCart)
         }

         if (
            !isVariableValid(AccessToken) &&
            getCountInCart({ cartItems: cart?.items, productId }) < 1
         ) {
            localCart.items.push({
               productId,
               product: await getProduct(),
               count: 1,
            })

            dispatchCart(localCart)
         }

         setFetchingCart(false)
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromCart() {
      try {
         setFetchingCart(true)

         const count = getCountInCart({
            cartItems: cart?.items,
            productId: product?.id,
         })

         if (isVariableValid(AccessToken)) {
            const response = await fetch(`/api/cart/modify`, {
               method: count > 1 ? 'PATCH' : 'DELETE',
               body: JSON.stringify({ productId }),
               headers: {
                  'Content-Type': 'application/json-string',
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any
         const index = findLocalCartIndexById(localCart, productId)

         if (
            !isVariableValid(AccessToken) &&
            getCountInCart({ cartItems: cart?.items, productId }) > 1
         ) {
            for (let i = 0; i < localCart.items.length; i++) {
               if (localCart.items[i].productId === product?.id) {
                  localCart.items[i].count = localCart.items[i].count - 1
               }
            }

            dispatchCart(localCart)
         }

         if (
            !isVariableValid(AccessToken) &&
            getCountInCart({ cartItems: cart?.items, productId }) === 1
         ) {
            localCart.items.splice(index, 1)

            dispatchCart(localCart)
         }

         setFetchingCart(false)
      } catch (error) {
         console.error({ error })
      }
   }

   function CartButton() {
      const count = getCountInCart({
         cartItems: cart?.items,
         productId,
      })

      if (fetchingCart)
         return (
            <Button disabled>
               <Spinner />
            </Button>
         )

      if (count === 0) {
         return <Button onClick={onAddToCart}>🛒 Add to Cart</Button>
      }

      if (count > 0) {
         return (
            <>
               <Button variant="outline" size="icon" onClick={onRemoveFromCart}>
                  {count === 1 ? (
                     <Cross2Icon className="h-4" />
                  ) : (
                     <MinusIcon className="h-4" />
                  )}
               </Button>
               <Button disabled variant="ghost" size="icon">
                  {count}
               </Button>
               <Button
                  disabled={productId == ''}
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
               <Link href={`/product/${product?.id}`}>
                  <Image
                     className="rounded-t-lg"
                     src={product?.images[0]}
                     alt="product image"
                     fill
                     style={{ objectFit: 'cover' }}
                  />
               </Link>
            </div>
         </CardHeader>
         <CardContent className="grid grid-cols-6 gap-4 p-3">
            <div className="relative w-full col-span-2 hidden md:inline-flex">
               <Link href={`/product/${product?.id}`}>
                  <Image
                     className="rounded-lg"
                     src={product?.images[0]}
                     alt="item image"
                     fill
                     style={{ objectFit: 'cover' }}
                  />
               </Link>
            </div>
            <div className="col-span-4">
               <Link href={`/product/${product?.id}`}>
                  <h2>{product?.title}</h2>
               </Link>
               <p className="my-2 text-xs text-neutral-500 text-justify">
                  {product?.description}
               </p>
               <h2 className="text-lg mb-4">${product?.price}</h2>
               <CartButton />
            </div>
         </CardContent>
      </Card>
   )
}

export function CartProductSkeleton() {
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
