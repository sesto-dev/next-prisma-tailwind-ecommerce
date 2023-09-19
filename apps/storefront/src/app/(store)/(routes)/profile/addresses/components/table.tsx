'use client'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import Link from 'next/link'

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

interface AddressTableProps {
   data: AddressColumn[]
}

export const AddressTable: React.FC<AddressTableProps> = ({ data }) => {
   return <DataTable searchKey="products" columns={columns} data={data} />
}
