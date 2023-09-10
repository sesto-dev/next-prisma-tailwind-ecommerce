'use client'

import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from './cell-action'

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
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
