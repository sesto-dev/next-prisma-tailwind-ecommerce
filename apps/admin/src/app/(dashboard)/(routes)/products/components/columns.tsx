'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { CheckIcon, XIcon } from 'lucide-react'

export type ProductColumn = {
   id: string
   title: string
   price: string
   discount: string
   category: string
   sales: number
   isAvailable: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
   {
      accessorKey: 'title',
      header: 'Title',
   },
   {
      accessorKey: 'price',
      header: 'Price',
   },
   {
      accessorKey: 'discount',
      header: 'Discount',
   },
   {
      accessorKey: 'category',
      header: 'Category',
   },
   {
      accessorKey: 'sales',
      header: 'Sales #',
   },
   {
      accessorKey: 'isAvailable',
      header: 'Availability',
      cell: (props) => {
         return props.cell.getValue() ? <CheckIcon /> : <XIcon />
      },
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
