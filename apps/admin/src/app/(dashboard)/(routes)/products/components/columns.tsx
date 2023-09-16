'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import { CheckIcon, XIcon, EditIcon } from 'lucide-react'
import Link from 'next/link'

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
      cell: (props) => (props.cell.getValue() ? <CheckIcon /> : <XIcon />),
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/products/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]
