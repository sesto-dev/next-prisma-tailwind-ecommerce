import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import type { OrderColumn } from './components/columns'
import { OrderClient } from './components/client'

export default async function OrdersPage({ searchParams }) {
   const {
      userId,
      sort,
      isPaid,
      brand,
      category,
      page = 1,
      minPayable,
      maxPayable,
   } = searchParams ?? null

   const orderBy = getOrderBy(sort)

   const orders = await prisma.order.findMany({
      where: {
         userId,
         isPaid,
         orderItems: {
            some: {
               product: {
                  brand: {
                     title: {
                        contains: brand,
                     },
                  },
                  categories: {
                     some: {
                        title: {
                           contains: category,
                        },
                     },
                  },
               },
            },
         },
         payable: {
            gte: minPayable,
            lte: maxPayable,
         },
      },
      include: {
         orderItems: {
            include: {
               product: true,
            },
         },
      },
      skip: (page - 1) * 12,
      take: 12,
      orderBy,
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

function getOrderBy(sort) {
   let orderBy

   switch (sort) {
      case 'highest_payable':
         orderBy = {
            payable: 'desc',
         }
         break
      case 'lowest_payable':
         orderBy = {
            payable: 'asc',
         }
         break

      default:
         orderBy = {
            createdAt: 'desc',
         }
         break
   }

   return orderBy
}
