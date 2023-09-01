import prisma from '@/lib/prisma'

import { PaymentForm } from './components/payment-form'
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
import type { PaymentColumn } from '../components/columns'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'
import { OrderClient } from '../components/client'

const PaymentPage = async ({ params }: { params: { paymentId: string } }) => {
   const payment = await prisma.payment.findUnique({
      where: {
         id: params.paymentId,
      },
      include: {
         provider: true,
         user: true,
      },
   })

   console.log({ payment })

   return (
      <div className="flex-col">
         <div className="flex-1 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] pt-6 pb-12">
            <div className="flex items-center justify-between">
               <Heading
                  title="Payment Data"
                  description="Items in this order and data about the user."
               />
            </div>
         </div>
      </div>
   )
}

export default PaymentPage
