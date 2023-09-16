'use client'

import { Button } from '@/components/ui/button'

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { EditIcon } from 'lucide-react'

export type BannersColumn = {
   id: string
   label: string
   createdAt: string
}

export const columns: ColumnDef<BannersColumn>[] = [
   {
      accessorKey: 'label',
      header: 'Label',
   },
   {
      accessorKey: 'createdAt',
      header: 'Date',
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/banners/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]
