'use client'

import { Button } from '@/components/ui/button'

import { OrderColumn } from './columns'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

interface CellActionProps {
   data: OrderColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   return (
      <Link href={`/orders/${data.id}`}>
         <Button size="icon" variant="outline">
            <EyeIcon className="h-4" />
         </Button>
      </Link>
   )
}
