'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Config from 'config/site'
import { cn } from 'lib/utils'
import { NavigationMenuDemo } from 'components/native/nav/menu'

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-medium sm:inline-block">
                    {Config.name}
                </span>
            </Link>
            <NavigationMenuDemo />
        </div>
    )
}
