import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import prisma from '@/lib/prisma'
import Link from 'next/link'

import { OrderForm } from './components/order-form'

const ProductPage = async ({ params }: { params: { orderId: string } }) => {
   const order = await prisma.order.findUnique({
      where: {
         id: params.orderId,
      },
      include: {
         address: true,
         discountCode: true,
         user: {
            include: {
               addresses: true,
               payments: true,
               orders: true,
            },
         },
         payments: {
            include: {
               provider: true,
            },
         },
         orderItems: { include: { product: true } },
         refund: true,
      },
   })

   function UserCard() {
      return (
         <Card className="my-4 p-2 bg-muted-foreground/5">
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
                        <div className="block space-y-4">
                           <div className="grid w-full items-center">
                              <h3>Name</h3>
                              <p className="text-muted-foreground">
                                 {order?.user?.name}
                              </p>
                           </div>
                           <div className="grid w-full items-center">
                              <h3>Email</h3>
                              <p className="text-muted-foreground">
                                 {order?.user?.email}
                              </p>
                           </div>
                           <div className="grid w-full items-center">
                              <h3>Phone</h3>
                              <p className="text-muted-foreground">
                                 {order?.user?.phone}
                              </p>
                           </div>
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
            <CardFooter>
               <Link
                  href={`/users/${order?.user?.id}`}
                  className="text-sm underline text-muted-foreground transition-colors hover:text-primary"
               >
                  Visit this user's profile.
               </Link>
            </CardFooter>
         </Card>
      )
   }

   function EditOrderCard() {
      return (
         <Card className="my-4 p-2">
            <CardContent>
               <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-2">
                     <AccordionTrigger>
                        <div className="block">
                           <h2 className="text-lg font-bold tracking-wider text-left">
                              EDIT ORDER
                           </h2>
                           <p className="text-sm font-light text-foreground/70">
                              User in this order.
                           </p>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent>
                        <OrderForm initialData={order} />
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
         </Card>
      )
   }

   return (
      <div className="flex-col">
         <div className="flex-1 pt-6 pb-12">
            <div className="flex items-center justify-between">
               <Heading
                  title="Order Data"
                  description="Items in this order and data about the user."
               />
            </div>
            <UserCard />
            <EditOrderCard />
         </div>
      </div>
   )
}

export default ProductPage
