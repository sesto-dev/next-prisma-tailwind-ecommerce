import { CommandMenu } from 'components/composites/command'
import { MainNav } from 'components/native/nav/main'
import { MobileNav } from 'components/native/nav/mobile'
import { ModeToggle } from 'components/composites/mode-toggle'
import LoginDialog from 'components/composites/login-dialog'
import { useValidAccessToken } from 'src/hooks/useAccessToken'
import { UserNav } from 'components/native//nav/user'

export default function Header() {
    const { Authenticated, AccessToken } = useValidAccessToken()

    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur mb-4">
            <div className="flex h-14 items-center">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="flex-1 w-auto md:flex-none">
                        <CommandMenu />
                    </div>
                    {Authenticated ? <UserNav /> : <LoginDialog />}
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}
