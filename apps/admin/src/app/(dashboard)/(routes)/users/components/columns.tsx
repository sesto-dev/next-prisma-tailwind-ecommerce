'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type UserColumn = {
   id: string
   name: string
   email: string
   phone: string
   orders: number
}

export const columns: ColumnDef<UserColumn>[] = [
   {
      accessorKey: 'name',
      header: 'Name',
   },
   {
      accessorKey: 'email',
      header: 'Email',
   },
   {
      accessorKey: 'phone',
      header: 'Phone',
   },
   {
      accessorKey: 'orders',
      header: 'Order #',
   },
   {
      id: 'actions',
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
