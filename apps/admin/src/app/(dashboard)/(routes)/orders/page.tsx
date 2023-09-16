import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import type { OrderColumn } from './components/columns'
import { OrderClient } from './components/client'

export default async function OrdersPage() {
   const orders = await prisma.order.findMany({
      where: {},
      include: {
         orderItems: {
            include: {
               product: true,
            },
         },
      },
      orderBy: {
         createdAt: 'desc',
      },
   })

   const formattedOrders: OrderColumn[] = orders.map((order) => ({
      id: order.id,
      number: `Order #${order.number}`,
      date: order.createdAt.toUTCString(),
      payable: '$' + order.payable.toString(),
      isPaid: order.isPaid,
      createdAt: format(order.createdAt, 'MMMM do, yyyy'),
   }))

   return <OrderClient data={formattedOrders} />
}
