'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Config from 'config/site'
import { cn } from 'lib/utils'

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <span className="hidden font-medium sm:inline-block">
                    {Config.name}
                </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-light tracking-wider">
                <Link
                    href="/products"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/product')
                            ? 'text-foreground font-semibold'
                            : 'text-foreground/60'
                    )}
                >
                    Products
                </Link>
                <Link
                    href="/blog"
                    className={cn(
                        'transition-colors hover:text-foreground/80',
                        pathname?.startsWith('/blog')
                            ? 'text-foreground font-semibold'
                            : 'text-foreground/60'
                    )}
                >
                    Blog
                </Link>
            </nav>
        </div>
    )
}
