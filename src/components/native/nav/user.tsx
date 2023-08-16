import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar'
import { Button } from 'components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function UserNav() {
    const router = useRouter()

    function onLogout() {
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')

        router.reload()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                >
                    <Avatar className="h-9 w-9 border-2">
                        <AvatarFallback>O</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            shadcn
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            m@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/user">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/cart">
                        <DropdownMenuItem>Cart</DropdownMenuItem>
                    </Link>
                    <Link href="/wishlist">
                        <DropdownMenuItem>Wishlist</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
