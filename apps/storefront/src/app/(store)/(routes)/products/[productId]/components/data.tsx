'use client'

import { Spinner } from '@/components/native/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useValidAccessToken } from '@/hooks/useAccessToken'
import { getCountInCart, getLocalCart } from '@/lib/cart'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'
import type { ProductWithAllVariants } from '@/types/prisma'
import { Cross2Icon, MinusIcon, PlusIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

export const DataSection = async ({
   product,
}: {
   product: ProductWithAllVariants
}) => {
   const { AccessToken } = useValidAccessToken()
   const { loading, cart, refreshCart, dispatchCart } = useCartContext()

   const [wishlist, setWishlist] = useState(null)
   const [fetchingCart, setFetchingCart] = useState(false)
   const [fetchingWishlist, setFetchingWishlist] = useState(true)

   useEffect(() => {
      async function getWishlist() {
         try {
            const response = await fetch(`/api/wishlist`, {
               headers: {
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()
            setWishlist(json?.wishlist?.items)
            setFetchingWishlist(false)
         } catch (error) {
            console.error({ error })
         }
      }

      if (isVariableValid(AccessToken)) getWishlist()
   }, [AccessToken])

   function isProductInWishlist() {
      for (let i = 0; i < wishlist?.length; i++) {
         if (wishlist[i]?.id === product?.id) {
            return true
         }
      }
      return false
   }

   function findLocalCartIndexById(array, productId) {
      for (let i = 0; i < array.length; i++) {
         if (array?.items[i]?.productId === productId) {
            return i
         }
      }
      return -1
   }

   async function onAddToCart() {
      try {
         setFetchingCart(true)

         const count = getCountInCart({
            cartItems: cart?.items,
            productId: product?.id,
         })

         if (isVariableValid(AccessToken)) {
            const response = await fetch(`/api/cart/modify`, {
               method: count > 0 ? 'PUT' : 'POST',
               body: JSON.stringify({ productId: product?.id }),
               headers: {
                  'Content-Type': 'application/json-string',
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any

         if (!isVariableValid(AccessToken) && count > 0) {
            for (let i = 0; i < localCart.items.length; i++) {
               if (localCart.items[i].productId === product?.id) {
                  localCart.items[i].count = localCart.items[i].count + 1
               }
            }

            dispatchCart(localCart)
         }

         if (!isVariableValid(AccessToken) && count < 1) {
            localCart.items.push({
               productId: product?.id,
               product,
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
               body: JSON.stringify({ productId: product?.id }),
               headers: {
                  'Content-Type': 'application/json-string',
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any
         const index = findLocalCartIndexById(localCart, product?.id)

         if (!isVariableValid(AccessToken) && count > 1) {
            for (let i = 0; i < localCart.items.length; i++) {
               if (localCart.items[i].productId === product?.id) {
                  localCart.items[i].count = localCart.items[i].count - 1
               }
            }

            dispatchCart(localCart)
         }

         if (!isVariableValid(AccessToken) && count === 1) {
            localCart.items.splice(index, 1)

            dispatchCart(localCart)
         }

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
            body: JSON.stringify({ productId: product?.id }),
            headers: {
               'Content-Type': 'application/json-string',
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
            body: JSON.stringify({ productId: product.id }),
            headers: {
               'Content-Type': 'application/json-string',
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

   function CartButton() {
      if (fetchingCart)
         return (
            <Button disabled>
               <Spinner />
            </Button>
         )

      const count = getCountInCart({
         cartItems: cart?.items,
         productId: product?.id,
      })

      if (count === 0) {
         return <Button onClick={onAddToCart}>🛒 Add to Cart</Button>
      }

      if (count > 0) {
         return (
            <>
               <Button variant="outline" size="icon" onClick={onRemoveFromCart}>
                  {count == 1 ? (
                     <Cross2Icon className="h-4 w-4" />
                  ) : (
                     <MinusIcon className="h-4 w-4" />
                  )}
               </Button>

               <Button disabled variant="outline" size="icon">
                  {count}
               </Button>
               <Button variant="outline" size="icon" onClick={onAddToCart}>
                  <PlusIcon className="h-4 w-4" />
               </Button>
            </>
         )
      }
   }

   function WishlistButton() {
      if (fetchingWishlist)
         return (
            <Button disabled>
               <Spinner />
            </Button>
         )

      if (!isProductInWishlist()) {
         return <Button onClick={onAddToWishlist}>🛒 Add to Wishlist</Button>
      }

      if (isProductInWishlist()) {
         return (
            <Button onClick={onRemoveFromWishlist}>
               🛒 Remove from Wishlist
            </Button>
         )
      }
   }

   return (
      <div className="col-span-2 w-full rounded-lg bg-neutral-100 p-6 dark:bg-neutral-900">
         <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
            {product.title}
         </h3>
         <hr className="my-4 w-full border-neutral-200 dark:border-neutral-800 sm:mx-auto" />
         <div className="flex gap-2 mb-2">
            <p className="text-sm">Brand:</p>
            <Badge variant="outline">{product.brand.title}</Badge>
         </div>
         <div className="flex gap-2">
            <p className="text-sm">Categories:</p>
            {product.categories.map(({ title }, index) => (
               <Badge variant="outline" key={index}>
                  {title}
               </Badge>
            ))}
         </div>
         <hr className="my-4 w-full border-neutral-200 dark:border-neutral-800 sm:mx-auto" />
         <small className="text-black dark:text-white">
            {product.description}
         </small>
         <hr className="my-4 w-full border-neutral-200 dark:border-neutral-800 sm:mx-auto" />
         <div className="flex gap-2">
            <CartButton />
            <WishlistButton />
         </div>
      </div>
   )
}
