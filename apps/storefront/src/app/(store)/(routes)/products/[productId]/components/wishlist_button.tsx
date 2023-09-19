'use client'

import { Spinner } from '@/components/native/icons'
import { Button } from '@/components/ui/button'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { HeartIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WishlistButton({ product }) {
   const { authenticated } = useAuthenticated()

   const [wishlist, setWishlist] = useState(null)
   const [fetchingWishlist, setFetchingWishlist] = useState(true)

   useEffect(() => {
      async function getWishlist() {
         try {
            const response = await fetch(`/api/wishlist`, {
               cache: 'no-store',
               method: 'GET',
            })

            const json = await response.json()

            setWishlist(json)
            setFetchingWishlist(false)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getWishlist()
   }, [authenticated])

   function isProductInWishlist() {
      for (let i = 0; i < wishlist?.length; i++) {
         if (wishlist[i]?.id === product?.id) {
            return true
         }
      }
      return false
   }

   async function onAddToWishlist() {
      try {
         setFetchingWishlist(true)

         const response = await fetch(`/api/wishlist`, {
            method: 'POST',
            body: JSON.stringify({ productId: product?.id, connect: true }),
            cache: 'no-store',
            headers: {
               'Content-Type': 'application/json-string',
            },
         })

         const json = await response.json()

         setWishlist(json)
         setFetchingWishlist(false)
      } catch (error) {
         console.error({ error })
      }
   }

   async function onRemoveFromWishlist() {
      try {
         setFetchingWishlist(true)

         const response = await fetch(`/api/wishlist`, {
            method: 'DELETE',
            body: JSON.stringify({ productId: product.id, connect: false }),
            cache: 'no-store',
            headers: {
               'Content-Type': 'application/json-string',
            },
         })

         const json = await response.json()

         setWishlist(json)
         setFetchingWishlist(false)
      } catch (error) {
         console.error({ error })
      }
   }

   if (!authenticated) {
      return
   }

   if (fetchingWishlist)
      return (
         <Button disabled>
            <Spinner />
         </Button>
      )

   if (!isProductInWishlist()) {
      return (
         <Button className="flex gap-2" onClick={onAddToWishlist}>
            <HeartIcon className="h-4" /> Add to Wishlist
         </Button>
      )
   }

   if (isProductInWishlist()) {
      return (
         <Button
            variant="outline"
            className="flex gap-2"
            onClick={onRemoveFromWishlist}
         >
            <HeartIcon className="h-4" /> Remove from Wishlist
         </Button>
      )
   }
}
