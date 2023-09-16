'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'
import { CheckIcon, XIcon } from 'lucide-react'

export type PaymentColumn = {
   id: string
   number: string
   isSuccessful: boolean
   payable: string
   status: string
   createdAt: string
}

export const columns: ColumnDef<PaymentColumn>[] = [
   {
      accessorKey: 'number',
      header: 'Payment Number',
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
      accessorKey: 'isSuccessful',
      header: 'Successful',
      cell: (props) => {
         return props.cell.getValue() ? <CheckIcon /> : <XIcon />
      },
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
