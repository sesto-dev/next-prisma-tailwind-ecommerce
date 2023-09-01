'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { UserColumn, columns } from './columns'

interface UserClientProps {
   data: UserColumn[]
}

export const UsersClient: React.FC<UserClientProps> = ({ data }) => {
   const router = useRouter()

   return (
      <>
         <div className="flex items-center justify-between">
            <Heading
               title="Users"
               description="Manage products for your store"
            />
         </div>
         <Separator />
         <DataTable searchKey="title" columns={columns} data={data} />
      </>
   )
}
