import { CommandMenu } from 'components/composites/command'
import { MainNav } from 'nav/main'
import { MobileNav } from 'nav/mobile'
import LoginDialog from 'components/composites/login-dialog'
import { useValidAccessToken } from 'hooks/useAccessToken'
import { UserNav } from 'nav/user'
import { Button } from 'components/ui/button'
import { CartNav } from 'nav/cart'
import { isVariableValid } from 'lib/utils'

export default function Header() {
    const { AccessToken } = useValidAccessToken()

    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur mb-4">
            <div className="flex h-14 items-center">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center space-x-2 justify-end">
                    <div className="flex-none">
                        <CommandMenu />
                    </div>
                    <CartNav />
                    {isVariableValid(AccessToken) ? (
                        <UserNav />
                    ) : (
                        <LoginDialog />
                    )}
                </div>
            </div>
        </header>
    )
}
