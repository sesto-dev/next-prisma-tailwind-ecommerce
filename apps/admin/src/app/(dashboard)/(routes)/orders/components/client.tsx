'use client'

import { DataTable } from '@/components/ui/data-table'

import { columns, OrderColumn } from './columns'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SortBy } from './options'

interface OrderClientProps {
   data: OrderColumn[]
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
   return (
      <div className="block space-y-4 my-6">
         <Heading
            title={`Orders (${data.length})`}
            description="Manage orders for your store"
         />
         <Separator />
         <div className="grid grid-cols-4 gap-2">
            <SortBy initialData={'highest_payable'} />
         </div>
         <DataTable searchKey="products" columns={columns} data={data} />
      </div>
   )
}
