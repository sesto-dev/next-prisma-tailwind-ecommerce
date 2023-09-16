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
import { PaymentClient } from '../components/client'

export async function PaymentPage({
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
