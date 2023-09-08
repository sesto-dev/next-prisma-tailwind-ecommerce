'use client'

import React, { useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn, slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from '@/components/ui/command'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'

export function UserCombobox({ initialValue }) {
   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   const categories = [
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
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full md:w-auto my-4 flex gap-2 justify-between"
            >
               {value ? getCategoryTitle() : 'Select category...'}
               <ChevronsUpDown className="h-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command>
               <CommandInput placeholder="Search category..." />
               <CommandEmpty>No category found.</CommandEmpty>
               <CommandGroup>
                  {categories.map(({ title, value }) => (
                     <Link href={value} key={title}>
                        <CommandItem>
                           <Check
                              className={cn(
                                 'mr-2 h-4',
                                 value === title ? 'opacity-100' : 'opacity-0'
                              )}
                           />
                           <h3>{title}</h3>
                        </CommandItem>
                     </Link>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}
