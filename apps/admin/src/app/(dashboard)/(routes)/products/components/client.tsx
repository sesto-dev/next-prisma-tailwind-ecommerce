'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { ProductColumn, columns } from './columns'

interface ProductClientProps {
   data: ProductColumn[]
}

export const ProductsClient: React.FC<ProductClientProps> = ({ data }) => {
   const router = useRouter()

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading
               title={`Products (${data.length})`}
               description="Manage products for your store"
            />
            <Button onClick={() => router.push(`/products/new`)}>
               <Plus className="mr-2 h-4" /> Add New
            </Button>
         </div>
         <Separator />
         <DataTable searchKey="title" columns={columns} data={data} />
      </>
   )
}
