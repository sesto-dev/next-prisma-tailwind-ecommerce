'use client'

import { CommandMenu } from '@/components/composites/command'
import { MainNav } from '@/components/native/nav/main'
import { MobileNav } from '@/components/native//nav/mobile'
import LoginDialog from '@/components/composites/login-dialog'
import { useValidAccessToken } from '@/hooks/useAccessToken'
import { UserNav } from '@/components/native//nav/user'
import { CartNav } from '@/components/native//nav/cart'
import { isVariableValid } from '@/lib/utils'

export default function Header() {
   const { AccessToken } = useValidAccessToken()

   return (
      <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur mb-4 px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem]">
         <div className="flex h-14 items-center">
            <MainNav />
            <MobileNav />
            <div className="flex flex-1 items-center space-x-2 justify-end">
               <div className="flex-none">
                  <CommandMenu />
               </div>
               <CartNav />
               {isVariableValid(AccessToken) ? <UserNav /> : <LoginDialog />}
            </div>
         </div>
      </header>
   )
}
