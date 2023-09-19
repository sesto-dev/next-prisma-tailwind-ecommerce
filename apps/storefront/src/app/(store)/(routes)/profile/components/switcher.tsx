'use client'

import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronsUpDownIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

export function UserCombobox({ initialValue }) {
   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   const categories = [
      {
         title: 'Addresses',
         description: 'Visit your addresses.',
         value: '/profile/addresses',
      },
      {
         title: 'Edit Profile',
         description: 'Visit your orders.',
         value: '/profile/edit',
      },
      {
         title: 'Orders',
         description: 'Visit your orders.',
         value: '/profile/orders',
      },
   ]

   function getCategoryTitle() {
      for (const category of categories) {
         if (value.includes(category.value)) return category.title
      }
   }

   useEffect(() => {
      setValue(initialValue)
   }, [initialValue])

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Button variant="outline" className="flex gap-2">
               <p>{getCategoryTitle()}</p>
               <ChevronsUpDownIcon className="h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            {categories.map(({ title, value }) => (
               <Link href={value} key={title}>
                  <DropdownMenuItem>{title}</DropdownMenuItem>
               </Link>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
