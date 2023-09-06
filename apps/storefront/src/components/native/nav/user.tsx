import {
   ArchiveIcon,
   ExitIcon,
   GearIcon,
   HeartIcon,
   LockClosedIcon,
   PersonIcon,
} from '@radix-ui/react-icons'
import { ModeToggle } from '@/components/composites/mode-toggle'
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
   function onLogout() {
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('RefreshToken')

      window.location.reload()
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
               <Link href="/user">
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
               <DropdownMenuItem>
                  <ModeToggle />
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
