'use client'

import { useParams, useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'

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

interface CategoriesClientProps {
   data: CategoryColumn[]
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
   const params = useParams()
   const router = useRouter()

   return <DataTable searchKey="title" columns={columns} data={data} />
}
