'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
   const { setTheme } = useTheme()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <div className="flex">
               <SunIcon className="h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
               <MoonIcon className="absolute h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
               Toggle Theme
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme('light')}>
               Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('dark')}>
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme('system')}>
               System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
