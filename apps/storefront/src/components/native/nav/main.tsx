'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Config from '@/config/site'
import { NavigationMenuDemo } from '@/components/native/nav/menu'

export function MainNav() {
   const pathname = usePathname()

   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center">
            <span className="hidden font-medium sm:inline-block">
               {Config.name}
            </span>
         </Link>
         <NavigationMenuDemo />
      </div>
   )
}
