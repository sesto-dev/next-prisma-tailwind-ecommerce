'use client'

import {
   ArchiveIcon,
   ExitIcon,
   GearIcon,
   HeartIcon,
   LockClosedIcon,
   PersonIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function UserNav() {
   async function onLogout() {
      try {
         const response = await fetch('/api/auth/logout', {
            cache: 'no-store',
         })

         if (typeof window !== 'undefined' && window.localStorage) {
            document.cookie =
               'logged-in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
         }

         if (response.status === 200) window.location.reload()
      } catch (error) {
         console.error({ error })
      }
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-9">
               <PersonIcon />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                     User profile.
                  </p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <Link href="/profile">
                  <DropdownMenuItem>
                     <PersonIcon className="h-4 mr-2" />
                     Profile
                  </DropdownMenuItem>
               </Link>
               <Link href="/cart">
                  <DropdownMenuItem>
                     <LockClosedIcon className="h-4 mr-2" /> Cart
                  </DropdownMenuItem>
               </Link>
               <Link href="/wishlist">
                  <DropdownMenuItem>
                     <HeartIcon className="h-4 mr-2" /> Wishlist
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuItem>
                  <GearIcon className="h-4 mr-2" /> Settings
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
               <ExitIcon className="h-4 mr-2" /> Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
