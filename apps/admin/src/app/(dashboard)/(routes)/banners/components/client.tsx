'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, BannersColumn } from './columns'

interface BannerClientProps {
   data: BannersColumn[]
}

export const BannersClient: React.FC<BannerClientProps> = ({ data }) => {
   const params = useParams()
   const router = useRouter()

   return (
      <div className="block space-y-4 my-6">
         <div className="flex items-center justify-between">
            <Heading
               title={`Banners (${data.length})`}
               description="Manage banners for your store"
            />
            <Button onClick={() => router.push(`/banners/new`)}>
               <Plus className="mr-2 h-4" /> Add New
            </Button>
         </div>
         <Separator />
         <DataTable searchKey="label" columns={columns} data={data} />
      </div>
   )
}
