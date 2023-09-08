'use client'

import { usePathname } from 'next/navigation'
import prisma from '@/lib/prisma'

import { OrderForm } from './components/order-form'

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'

import Link from 'next/link'
import { UserCombobox } from '../../components/switcher'
import { useEffect, useState } from 'react'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { Loader } from '@/components/ui/loader'
import { ProductGrid } from '@/components/native/Product'

const ProductPage = ({ params }: { params: { orderId: string } }) => {
   const { authenticated } = useAuthenticated()
   const [order, setOrder] = useState(null)
   const pathname = usePathname()

   useEffect(() => {
      async function getOrder() {
         try {
            const response = await fetch(`/api/orders/${params.orderId}`, {
               method: 'GET',
               cache: 'no-store',
            })

            const json = await response.json()
            console.log({ json })
            setOrder(json)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getOrder()
   }, [authenticated, params])

   function EditOrderCard() {
      return (
         <Card className="my-4 p-2">
            <CardContent>
               {order ? (
                  <div>{order.id}</div>
               ) : (
                  <div className="h-[20vh]">
                     <div className="h-full my-4 flex items-center justify-center">
                        <Loader />
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>
      )
   }

   return (
      <div className="flex-col">
         <div className="flex-1">
            <div className="flex items-center justify-between">
               <div className="flex items-center justify-between">
                  <UserCombobox initialValue={pathname} />
               </div>
            </div>
            <EditOrderCard />
         </div>
      </div>
   )
}

export default ProductPage
