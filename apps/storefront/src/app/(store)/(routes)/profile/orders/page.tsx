'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Loader } from '@/components/ui/loader'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { UserCombobox } from '../components/switcher'
import type { OrderColumn } from './components/table'
import { OrdersTable } from './components/table'

export default function UserPage() {
   const { authenticated } = useAuthenticated()
   const [orders, setOrders] = useState(null)
   const pathname = usePathname()

   useEffect(() => {
      async function getOrders() {
         try {
            const response = await fetch(`/api/orders`, {
               method: 'GET',
               cache: 'no-store',
            })

            const json = await response.json()
            setOrders(json)
         } catch (error) {
            console.error({ error })
         }
      }

      if (authenticated) getOrders()
   }, [authenticated])

   return (
      <div className="flex-col">
         <div className="flex-1 ">
            <div className="flex items-center justify-between">
               <UserCombobox initialValue={pathname} />
            </div>
            {orders ? (
               <OrderSection orders={orders} />
            ) : (
               <Card className="my-4 bg-muted-foreground/5">
                  <CardContent>
                     <div className="h-[20vh]">
                        <div className="h-full my-4 flex items-center justify-center">
                           <Loader />
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>
      </div>
   )
}

function OrderSection({ orders }) {
   const formattedOrders: OrderColumn[] = orders.map((order) => ({
      id: order.id,
      number: `Order #${order.number}`,
      date: order.createdAt.toString(),
      payable: '$' + order.payable.toString(),
      isPaid: order.isPaid,
   }))

   return <OrdersTable data={formattedOrders} />
}
