'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { CheckIcon, XIcon } from 'lucide-react'

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
      cell: (props) => {
         return props.cell.getValue() ? <CheckIcon /> : <XIcon />
      },
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
