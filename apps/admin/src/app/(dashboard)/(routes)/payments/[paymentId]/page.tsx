import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prisma'
import { formatter } from '@/lib/utils'
import { format } from 'date-fns'

import { PaymentClient } from '../components/client'
import type { PaymentColumn } from '../components/columns'
import { PaymentForm } from './components/payment-form'

export default async function PaymentPage({
   params,
}: {
   params: { paymentId: string }
}) {
   const payment = await prisma.payment.findUnique({
      where: {
         id: params.paymentId,
      },
      include: {
         provider: true,
         user: true,
      },
   })

   return (
      <div className="block space-y-4 my-6">
         <Heading
            title="Payment Data"
            description="Items in this order and data about the user."
         />
         <Separator />
      </div>
   )
}
