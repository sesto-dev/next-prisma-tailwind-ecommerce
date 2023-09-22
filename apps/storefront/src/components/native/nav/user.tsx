'use client'

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
import {
   CreditCardIcon,
   HeartIcon,
   ListOrderedIcon,
   LogOutIcon,
   MapPinIcon,
   UserIcon,
} from 'lucide-react'
import { ShoppingBasketIcon } from 'lucide-react'
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
               <UserIcon className="h-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
               <Link href="/profile/addresses">
                  <DropdownMenuItem className="flex gap-2">
                     <MapPinIcon className="h-4" />
                     Edit Addresses
                  </DropdownMenuItem>
               </Link>
               <Link href="/profile/edit">
                  <DropdownMenuItem className="flex gap-2">
                     <UserIcon className="h-4" />
                     Edit Profile
                  </DropdownMenuItem>
               </Link>
               <Link href="/profile/orders">
                  <DropdownMenuItem className="flex gap-2">
                     <ListOrderedIcon className="h-4" />
                     Orders
                  </DropdownMenuItem>
               </Link>
               <Link href="/profile/payments">
                  <DropdownMenuItem className="flex gap-2">
                     <CreditCardIcon className="h-4" />
                     Payments
                  </DropdownMenuItem>
               </Link>
               <DropdownMenuSeparator />
               <Link href="/cart">
                  <DropdownMenuItem className="flex gap-2">
                     <ShoppingBasketIcon className="h-4" /> Cart
                  </DropdownMenuItem>
               </Link>
               <Link href="/wishlist">
                  <DropdownMenuItem className="flex gap-2">
                     <HeartIcon className="h-4" /> Wishlist
                  </DropdownMenuItem>
               </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2" onClick={onLogout}>
               <LogOutIcon className="h-4" /> Logout
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
