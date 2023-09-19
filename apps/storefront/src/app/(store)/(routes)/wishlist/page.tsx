'use client'

import { CartGrid } from '@/app/(store)/(routes)/cart/components/grid'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { isVariableValid, validateBoolean } from '@/lib/utils'
import { useUserContext } from '@/state/User'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function User({}) {
   const { authenticated } = useAuthenticated()
   const { user, loading } = useUserContext()

   const [items, setItems] = useState(null)
   const router = useRouter()

   useEffect(() => {
      if (!loading && !isVariableValid(user)) router.push('/')
   }, [user, loading, router])

   useEffect(() => {
      async function getWishlist() {
         try {
            const response = await fetch(`/api/wishlist`, {
               cache: 'no-store',
            })

            const json = await response.json()

            setItems(json?.wishlist?.items)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getWishlist()
   }, [authenticated])

   return (
      <>
         <CartGrid />
      </>
   )
}
