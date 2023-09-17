'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { EditIcon } from 'lucide-react'

export type AddressColumn = {
   id: string
   address: string
   city: string
   phone: string
   postal: string
}

export const columns: ColumnDef<AddressColumn>[] = [
   {
      accessorKey: 'city',
      header: 'City',
   },
   {
      accessorKey: 'address',
      header: 'Address',
   },
   {
      accessorKey: 'phone',
      header: 'Phone Number',
   },
   {
      accessorKey: 'postal',
      header: 'Postal Code',
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/profile/addresses/${row.original.id}`}>
            <Button size="icon" variant="outline">
               <EditIcon className="h-4" />
            </Button>
         </Link>
      ),
   },
]
