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
import { useAuthenticated } from '@/hooks/useAccessToken'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartContext } from '@/state/Cart'
import Image from 'next/image'
import { Spinner } from '@/components/native/icons'
import { CrossIcon, MinusIcon, PlusIcon } from 'lucide-react'

export const Item = ({ cartItem }) => {
   const { authenticated } = useAuthenticated()
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

         if (validateBoolean(authenticated, true)) {
            const response = await fetch(`/api/cart/modify`, {
               method:
                  getCountInCart({
                     cartItems: cart?.items,
                     productId,
                  }) > 0
                     ? 'PUT'
                     : 'POST',
               body: JSON.stringify({ productId }),
               cache: 'no-store',
               headers: {
                  'Content-Type': 'application/json-string',
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any

         if (
            !validateBoolean(authenticated, true) &&
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
            !validateBoolean(authenticated, true) &&
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

         if (validateBoolean(authenticated, true)) {
            const response = await fetch(`/api/cart/modify`, {
               method: count > 1 ? 'PATCH' : 'DELETE',
               body: JSON.stringify({ productId }),
               cache: 'no-store',
               headers: {
                  'Content-Type': 'application/json-string',
               },
            })

            const json = await response.json()

            dispatchCart(json?.cart)
         }

         const localCart = getLocalCart() as any
         const index = findLocalCartIndexById(localCart, productId)

         if (
            !validateBoolean(authenticated, true) &&
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
            !validateBoolean(authenticated, true) &&
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
                     <CrossIcon className="h-4" />
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
               <Link href={`/products/${product?.id}`}>
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
               <Link href={`/products/${product?.id}`}>
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
               <Link href={`/products/${product?.id}`}>
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
