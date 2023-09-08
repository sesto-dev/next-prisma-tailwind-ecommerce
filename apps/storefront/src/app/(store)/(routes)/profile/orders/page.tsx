'use client'

import { usePathname } from 'next/navigation'
import { UserForm } from '../edit/components/user-form'
import { Heading } from '@/components/native/heading'

import { useAuthenticated } from '@/hooks/useAuthentication'
import type { OrderColumn } from './components/columns'
import { OrderClient } from './components/client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { UserCombobox } from '../components/switcher'

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
            {orders && <OrderSection orders={orders} />}
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
      isPaid: order.isPaid ? 'Yes.' : 'No.',
   }))

   return <OrderClient data={formattedOrders} />
}
