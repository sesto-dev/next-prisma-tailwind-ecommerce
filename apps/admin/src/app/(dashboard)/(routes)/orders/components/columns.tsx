'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, XIcon, EditIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export type OrderColumn = {
   id: string
   isPaid: boolean
   payable: string
   number: string
   createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
   {
      accessorKey: 'number',
      header: 'Order Number',
   },
   {
      accessorKey: 'date',
      header: 'Date',
   },
   {
      accessorKey: 'payable',
      header: 'Payable',
   },
   {
      accessorKey: 'isPaid',
      header: 'Paid',
      cell: (props) => (props.cell.getValue() ? <CheckIcon /> : <XIcon />),
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/orders/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]
