'use client'

import * as React from 'react'
import Link from 'next/link'

import config from '@/config/site'
import { NavigationMenuDemo } from '@/components/native/nav/menu'

export function MainNav() {
   return (
      <div className="hidden md:flex gap-4">
         <Link href="/" className="flex items-center">
            <span className="hidden font-medium sm:inline-block">
               {config.name}
            </span>
         </Link>
         <NavigationMenuDemo />
      </div>
   )
}
