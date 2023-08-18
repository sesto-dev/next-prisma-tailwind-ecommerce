import {
    ArchiveIcon,
    ExitIcon,
    GearIcon,
    HeartIcon,
    LockClosedIcon,
    PersonIcon,
} from '@radix-ui/react-icons'
import { ModeToggle } from 'components/composites/mode-toggle'
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

export function CartNav() {
    return (
        <Link href="/cart">
            <Button size="icon" variant="outline" className="h-9">
                <LockClosedIcon />
            </Button>
        </Link>
    )
}
