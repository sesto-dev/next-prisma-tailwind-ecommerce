'use client'

import { useEffect, useState } from 'react'

import { useAuthenticated } from '@/hooks/useAccessToken'
import { isVariableValid, validateBoolean } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CartGrid } from '@/app/(store)/(routes)/cart/components/grid'
import { useUserContext } from '@/state/User'

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

      if (validateBoolean(authenticated, true)) getWishlist()
   }, [authenticated])

   return (
      <>
         <CartGrid />
      </>
   )
}
