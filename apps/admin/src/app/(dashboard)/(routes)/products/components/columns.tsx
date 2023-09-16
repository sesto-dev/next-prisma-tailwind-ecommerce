'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type ProductColumn = {
   id: string
   title: string
   price: string
   discount: string
   category: string
   sales: number
   isAvailable: string
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
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
