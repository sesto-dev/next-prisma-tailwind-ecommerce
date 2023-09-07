'use client'

import { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCategoryModal } from '@/hooks/use-category-modal'
import { AlertModal } from '@/components/modals/alert-modal'

import { CategoryColumn } from './columns'

interface CellActionProps {
   data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
   const router = useRouter()
   const params = useParams()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false)

   const onConfirm = async () => {
      try {
         setLoading(true)

         await fetch(`/api/categories/${data.id}`, {
            method: 'DELETE',
            cache: 'no-store',
         })

         toast.success('Category deleted.')
         router.refresh()
      } catch (error) {
         toast.error(
            'Make sure you removed all products using this category first.'
         )
      } finally {
         setOpen(false)
         setLoading(false)
      }
   }

   const onCopy = (id: string) => {
      navigator.clipboard.writeText(id)
      toast.success('Category ID copied to clipboard.')
   }

   return (
      <>
         <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
         />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Actions</DropdownMenuLabel>
               <DropdownMenuItem onClick={() => onCopy(data.id)}>
                  <Copy className="mr-2 h-4" /> Copy Id
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => router.push(`/categories/${data.id}`)}
               >
                  <Edit className="mr-2 h-4" /> Update
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => setOpen(true)}>
                  <Trash className="mr-2 h-4" /> Delete
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
