import { type ClassValue, clsx } from 'clsx'
import { NextResponse } from 'next/server'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
   const date = new Date(input)
   return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
   })
}

export function absoluteUrl(path: string) {
   return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function isVariableValid(variable) {
   return variable !== null && variable !== undefined
}

export function validateBoolean(variable, value) {
   if (isVariableValid(variable) && variable === value) {
      return true
   }

   return false
}

export function isMacOs() {
   return window.navigator.userAgent.includes('Mac')
}

export function getErrorResponse(
   status: number = 500,
   message: string,
   errors: ZodError | null = null
) {
   console.error({ errors, status, message })

   return new NextResponse(
      JSON.stringify({
         status: status < 500 ? 'fail' : 'error',
         message,
         errors: errors ? errors.flatten() : null,
      }),
      {
         status,
         headers: { 'Content-Type': 'application/json' },
      }
   )
}
