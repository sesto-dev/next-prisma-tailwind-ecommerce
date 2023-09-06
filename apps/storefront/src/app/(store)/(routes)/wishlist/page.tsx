'use client'

import { useEffect, useState } from 'react'

import { useValidAccessToken } from '@/hooks/useAccessToken'
import { isVariableValid } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CartGrid } from '@/app/(store)/(routes)/cart/components/grid'
import { useUserContext } from '@/state/User'

export default function User({}) {
   const { AccessToken } = useValidAccessToken()
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
               headers: {
                  Authorization: `Bearer ${AccessToken}`,
               },
            })

            const json = await response.json()

            setItems(json?.wishlist?.items)
         } catch (error) {
            console.error({ error })
         }
      }

      if (isVariableValid(AccessToken)) getWishlist()
   }, [AccessToken])

   return (
      <>
         <CartGrid />
      </>
   )
}
