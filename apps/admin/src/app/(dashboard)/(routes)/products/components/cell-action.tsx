'use client'

import { Button } from '@/components/ui/button'

import { ProductColumn } from './columns'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

interface CellActionProps {
   data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   return (
      <Link href={`/products/${data.id}`}>
         <Button size="icon" variant="outline">
            <EyeIcon className="h-4" />
         </Button>
      </Link>
   )
}
