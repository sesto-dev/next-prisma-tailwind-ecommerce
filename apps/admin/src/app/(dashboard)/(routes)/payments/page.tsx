import { format } from 'date-fns'

import prisma from '@/lib/prisma'

import type { PaymentColumn } from './components/columns'
import { OrderClient } from './components/client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

const PaymentsPage = async () => {
   const payments = await prisma.payment.findMany({
      where: {},
      include: {
         provider: true,
         user: true,
         order: true,
      },
      orderBy: {
         updatedAt: 'desc',
      },
   })

   const formattedPayments: PaymentColumn[] = payments.map((payment) => ({
      id: payment.id,
      number: 'Payment #' + payment.number.toString(),
      status: payment.status,
      date: payment.createdAt.toUTCString(),
      payable: '$' + payment.payable.toString(),
      isSuccessful: payment.isSuccessful ? 'Yes.' : 'No.',
      createdAt: format(payment.createdAt, 'MMMM do, yyyy'),
   }))

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 pt-6">
            <Heading
               title={`Payments (${formattedPayments.length})`}
               description="Manage orders for your store"
            />
            <Separator />
            <OrderClient data={formattedPayments} />
         </div>
      </div>
   )
}

export default PaymentsPage
