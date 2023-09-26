'use client'

import { Button } from '@/components/ui/button'
import {
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
   CommandSeparator,
} from '@/components/ui/command'
import { docsConfig } from '@/config/docs'
import { cn } from '@/lib/utils'
import { DialogProps } from '@radix-ui/react-alert-dialog'
import { CircleIcon, LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import * as React from 'react'

export function CommandMenu({ ...props }: DialogProps) {
   const router = useRouter()
   const [open, setOpen] = React.useState(false)
   const { setTheme } = useTheme()

   React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
         if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
         }
      }

      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
   }, [])

   const runCommand = React.useCallback((command: () => unknown) => {
      setOpen(false)
      command()
   }, [])

   return (
      <>
         <Button
            variant="outline"
            className={cn(
               'relative w-full justify-start text-sm font-light text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
            )}
            onClick={() => setOpen(true)}
            {...props}
         >
            <span className="inline-flex">Search...</span>
         </Button>
         <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
               <CommandEmpty>No results found.</CommandEmpty>

               <CommandGroup heading="Links">
                  {docsConfig.sidebarNav.map((navItem) => (
                     <CommandItem
                        key={navItem.href}
                        value={navItem.title}
                        onSelect={() => {
                           runCommand(() => router.push(navItem.href as string))
                        }}
                     >
                        <div className="mr-2 flex h-4 items-center justify-center">
                           <CircleIcon className="h-3" />
                        </div>
                        {navItem.title}
                     </CommandItem>
                  ))}
               </CommandGroup>
               <CommandSeparator />
               <CommandGroup heading="Theme">
                  <CommandItem
                     onSelect={() => runCommand(() => setTheme('light'))}
                  >
                     <SunIcon className="mr-2 h-4" />
                     Light
                  </CommandItem>
                  <CommandItem
                     onSelect={() => runCommand(() => setTheme('dark'))}
                  >
                     <MoonIcon className="mr-2 h-4" />
                     Dark
                  </CommandItem>
                  <CommandItem
                     onSelect={() => runCommand(() => setTheme('system'))}
                  >
                     <LaptopIcon className="mr-2 h-4" />
                     System
                  </CommandItem>
               </CommandGroup>
            </CommandList>
         </CommandDialog>
      </>
   )
}
