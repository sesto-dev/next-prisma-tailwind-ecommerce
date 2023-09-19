'use client'

import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { EditIcon, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
      cell: ({ row, cell }) => (
         <Link href={`/users/${row.original.id}`}>
            <p>{cell?.getValue()?.toString()}</p>
         </Link>
      ),
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
      cell: ({ row, cell }) => (
         <Link href={`/orders?userId=${row.original.id}`}>
            <Badge className="items-center flex gap-1 w-min">
               <LinkIcon className="h-3" />
               <p className="shrink-0">{cell.getValue().toString()} Orders</p>
            </Badge>
         </Link>
      ),
   },
   {
      id: 'actions',
      cell: ({ row }) => (
         <Link href={`/users/${row.original.id}`}>
            <Badge className="items-center flex gap-1 w-min">
               <EditIcon className="h-3 p-0" />
               <p>Edit</p>
            </Badge>
         </Link>
      ),
   },
]

interface UsersTableProps {
   data: UserColumn[]
}

export const UsersTable: React.FC<UsersTableProps> = ({ data }) => {
   const router = useRouter()

   return <DataTable searchKey="name" columns={columns} data={data} />
}
