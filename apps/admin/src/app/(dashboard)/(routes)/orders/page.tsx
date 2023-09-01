import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import type { OrderColumn } from './components/columns'
import { OrderClient } from './components/client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

const OrdersPage = async () => {
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
      isPaid: order.isPaid ? 'Yes.' : 'No.',
      createdAt: format(order.createdAt, 'MMMM do, yyyy'),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6">
            <Heading
               title={`Orders (${formattedOrders.length})`}
               description="Manage orders for your store"
            />
            <Separator />
            <OrderClient data={formattedOrders} />
         </div>
      </div>
   )
}

export default OrdersPage
