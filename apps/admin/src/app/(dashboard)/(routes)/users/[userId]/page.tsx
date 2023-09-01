import prisma from '@/lib/prisma'

import { UserForm } from './components/user-form'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { OrderColumn } from '../../orders/components/columns'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'
import { OrderClient } from '../../orders/components/client'

const UserPage = async ({ params }: { params: { userId: string } }) => {
   const user = await prisma.user.findUnique({
      where: {
         id: params.userId,
      },
      include: {
         addresses: true,
         payments: true,
         orders: {
            include: {
               orderItems: {
                  include: {
                     product: true,
                  },
               },
            },
         },
      },
   })

   function OrdersCard() {
      const { orders } = user

      const formattedOrders: OrderColumn[] = orders.map((order) => ({
         id: order.id,
         number: `Order #${order.number}`,
         date: order.createdAt.toUTCString(),
         payable: '$' + order.payable.toString(),
         isPaid: order.isPaid ? 'Yes.' : 'No.',
         createdAt: format(order.createdAt, 'MMMM do, yyyy'),
      }))

      return (
         <Card className="my-4 p-2">
            <CardContent>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-2">
                     <AccordionTrigger>
                        <div className="block">
                           <h2 className="text-lg font-bold tracking-wider text-left">
                              ORDER HISTORY
                           </h2>
                           <p className="text-sm font-light text-foreground/70 text-left">
                              User in this order.
                           </p>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent>
                        <OrderClient data={formattedOrders} />
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
         </Card>
      )
   }

   function UserCard() {
      return (
         <Card className="my-4 p-2 pb-0">
            <CardContent>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-2">
                     <AccordionTrigger>
                        <div className="block">
                           <h2 className="text-lg font-bold tracking-wider text-left">
                              USER
                           </h2>
                           <p className="text-sm font-light text-foreground/70">
                              User in this order.
                           </p>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent>
                        <UserForm initialData={user} />
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
         </Card>
      )
   }

   return (
      <div className="flex-col">
         <div className="flex-1 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6 pb-12">
            <div className="flex items-center justify-between">
               <Heading
                  title="User Data"
                  description="Items in this order and data about the user."
               />
            </div>
            <UserCard />
            <OrdersCard />
         </div>
      </div>
   )
}

export default UserPage
