'use client'

import { Button } from '@/components/ui/button'

import { Column } from './columns'
import Link from 'next/link'
import { EditIcon as Icon } from 'lucide-react'

interface CellActionProps {
   data: Column
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   return (
      <Link href={`/banners/${data.id}`}>
         <Button size="icon" variant="outline">
            <Icon className="h-4" />
         </Button>
      </Link>
   )
}
