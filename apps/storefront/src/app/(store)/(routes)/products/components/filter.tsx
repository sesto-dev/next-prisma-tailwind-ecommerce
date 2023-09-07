'use client'

import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
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
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function CategoriesCombobox({ categories }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full justify-between"
            >
               {value
                  ? value.replace(/\w+/g, function (w) {
                       return w[0].toUpperCase() + w.slice(1).toLowerCase()
                    })
                  : 'Select category...'}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command>
               <CommandInput placeholder="Search category..." />
               <CommandEmpty>No category found.</CommandEmpty>
               <CommandGroup>
                  {categories.map((category) => (
                     <CommandItem
                        key={category.title}
                        onSelect={(currentValue) => {
                           const current = new URLSearchParams(
                              Array.from(searchParams.entries())
                           )

                           if (currentValue === value) {
                              current.delete('category')
                              setValue('')
                           } else {
                              current.set('category', currentValue)
                              setValue(currentValue)
                           }

                           // cast to string
                           const search = current.toString()
                           // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                           const query = search ? `?${search}` : ''

                           router.replace(`${pathname}${query}`, {
                              scroll: false,
                           })

                           setOpen(false)
                        }}
                     >
                        <Check
                           className={cn(
                              'mr-2 h-4 w-4',
                              value === category.title
                                 ? 'opacity-100'
                                 : 'opacity-0'
                           )}
                        />
                        {category.title}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export function BrandCombobox({ brands }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full justify-between"
            >
               {value
                  ? value.replace(/\w+/g, function (w) {
                       return w[0].toUpperCase() + w.slice(1).toLowerCase()
                    })
                  : 'Select brand...'}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command>
               <CommandInput placeholder="Search brand..." />
               <CommandEmpty>No brand found.</CommandEmpty>
               <CommandGroup>
                  {brands.map((brand) => (
                     <CommandItem
                        key={brand.title}
                        onSelect={(currentValue) => {
                           const current = new URLSearchParams(
                              Array.from(searchParams.entries())
                           )

                           if (currentValue === value) {
                              current.delete('brand')
                              setValue('')
                           } else {
                              current.set('brand', currentValue)
                              setValue(currentValue)
                           }

                           // cast to string
                           const search = current.toString()
                           // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                           const query = search ? `?${search}` : ''

                           router.replace(`${pathname}${query}`, {
                              scroll: false,
                           })

                           console.log({ value, currentValue })
                           setOpen(false)
                        }}
                     >
                        <Check
                           className={cn(
                              'mr-2 h-4 w-4',
                              value === brand.title
                                 ? 'opacity-100'
                                 : 'opacity-0'
                           )}
                        />
                        {brand.title}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export function AvailableToggle() {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [value, setValue] = React.useState(false)

   return (
      <div className="flex w-full border rounded-md items-center space-x-2">
         <div className="mx-auto flex gap-2 items-center">
            <Switch
               checked={value}
               onCheckedChange={(currentValue: boolean) => {
                  const current = new URLSearchParams(
                     Array.from(searchParams.entries())
                  )

                  current.set(
                     'isAvailable',
                     currentValue == true ? 'true' : 'false'
                  )
                  setValue(currentValue)

                  // cast to string
                  const search = current.toString()
                  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                  const query = search ? `?${search}` : ''

                  router.replace(`${pathname}${query}`, {
                     scroll: false,
                  })
               }}
               id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">Only Available</Label>
         </div>
      </div>
   )
}
