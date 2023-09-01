'use client'

import { DataTable } from '@/components/ui/data-table'

import { columns, PaymentColumn } from './columns'

interface PaymentClientProps {
   data: PaymentColumn[]
}

export const OrderClient: React.FC<PaymentClientProps> = ({ data }) => {
   return <DataTable searchKey="products" columns={columns} data={data} />
}
