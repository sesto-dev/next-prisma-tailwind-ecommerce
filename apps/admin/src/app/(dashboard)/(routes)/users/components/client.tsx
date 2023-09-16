'use client'

import { useRouter } from 'next/navigation'

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
      <div className="block space-y-4 my-6">
         <Heading title="Users" description="Manage products for your store" />
         <Separator />
         <DataTable searchKey="name" columns={columns} data={data} />
      </div>
   )
}
