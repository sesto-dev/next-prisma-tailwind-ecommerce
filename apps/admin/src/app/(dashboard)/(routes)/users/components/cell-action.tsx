'use client'

import { Button } from '@/components/ui/button'

import { UserColumn } from './columns'
import Link from 'next/link'
import { EyeIcon } from 'lucide-react'

interface CellActionProps {
   data: UserColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   return (
      <Link href={`/users/${data.id}`}>
         <Button size="icon" variant="outline">
            <EyeIcon className="h-4" />
         </Button>
      </Link>
   )
}
