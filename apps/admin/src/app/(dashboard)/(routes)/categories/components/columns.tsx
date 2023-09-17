'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { EditIcon } from 'lucide-react'

export type CategoryColumn = {
   id: string
   title: string
   products: number
}

export const columns: ColumnDef<CategoryColumn>[] = [
   {
      accessorKey: 'title',
      header: 'Title',
   },
   {
      accessorKey: 'products',
      header: 'Products #',
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/categories/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]
