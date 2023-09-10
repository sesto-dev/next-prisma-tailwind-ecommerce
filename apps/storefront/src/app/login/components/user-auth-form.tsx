'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader, SmartphoneIcon } from 'lucide-react'
import { isEmailValid } from '@/lib/regex'
import { getLocalCart } from '@/lib/cart'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const [isLoading, setIsLoading] = React.useState<boolean>(false)
   const [email, setEmail] = React.useState<string>('')
   const [OTP, setOTP] = React.useState('')
   const [usingOTP, setUsingOTP] = React.useState(false)

   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value)
   }

   const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOTP(event.target.value)
   }

   async function onSubmit() {
      try {
         setIsLoading(true)

         const response = await fetch('/api/auth/otp/email/try', {
            method: 'POST',
            body: JSON.stringify({ email }),
            cache: 'no-store',
         })

         if (response.ok) {
            setUsingOTP(true)
         }

         setIsLoading(false)
      } catch (error) {
         console.error({ error })
      }
   }

   async function onVerifyOTP() {
      try {
         setIsLoading(true)

         const response = await fetch('/api/auth/otp/email/verify', {
            method: 'POST',
            body: JSON.stringify({ email, OTP, cart: getLocalCart() }),
            cache: 'no-store',
         })

         if (response.ok) {
            window.location.assign(`/`)
         }
      } catch (error) {
         console.error({ error })
      }
   }

   return (
      <div className={cn('grid gap-6', className)} {...props}>
         <div className="grid gap-2">
            {usingOTP ? (
               <VerifyComponents
                  handleOTPChange={handleOTPChange}
                  onVerifyOTP={onVerifyOTP}
                  isLoading={isLoading}
               />
            ) : (
               <TryComponents
                  email={email}
                  handleEmailChange={handleEmailChange}
                  onSubmit={onSubmit}
                  isLoading={isLoading}
               />
            )}
         </div>
         <div className="relative">
            <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
               </span>
            </div>
         </div>
         <Button disabled variant="outline" type="button">
            {isLoading ? (
               <Loader className="mr-2 h-4 animate-spin" />
            ) : (
               <SmartphoneIcon className="mr-2 h-4" />
            )}
            Phone Number [Coming Soon]
         </Button>
      </div>
   )
}

function TryComponents({ handleEmailChange, isLoading, onSubmit, email }) {
   return (
      <>
         <div className="grid gap-1">
            <Label
               className="text-sm text-foreground/60 font-light"
               htmlFor="email"
            >
               Email
            </Label>
            <Input
               id="email"
               placeholder="name@example.com"
               type="email"
               autoCapitalize="none"
               autoComplete="email"
               autoCorrect="off"
               disabled={isLoading}
               onChange={handleEmailChange}
               required
            />
         </div>
         <Button
            onClick={onSubmit}
            disabled={isLoading || !isEmailValid(email)}
         >
            {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
            Login with Email
         </Button>
      </>
   )
}

function VerifyComponents({ isLoading, onVerifyOTP, handleOTPChange }) {
   return (
      <>
         <div className="grid gap-1">
            <Label
               className="text-sm text-foreground/60 font-light"
               htmlFor="email"
            >
               One-Time Password
            </Label>
            <Input
               placeholder="12345"
               disabled={isLoading}
               onChange={handleOTPChange}
               required
            />
         </div>
         <Button onClick={onVerifyOTP} disabled={isLoading}>
            {isLoading && <Loader className="mr-2 h-4 animate-spin" />}
            Submit
         </Button>
      </>
   )
}
