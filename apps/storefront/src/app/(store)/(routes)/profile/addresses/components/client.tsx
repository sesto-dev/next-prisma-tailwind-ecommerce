'use client'

import { DataTable } from '@/components/ui/data-table'

import { columns, AddressColumn } from './columns'

interface AddressClientProps {
   data: AddressColumn[]
}

export const AddressClient: React.FC<AddressClientProps> = ({ data }) => {
   return <DataTable searchKey="products" columns={columns} data={data} />
}
