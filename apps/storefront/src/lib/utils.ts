import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import { NextResponse } from 'next/server'

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

export function slugify(str) {
   str = str.replace(/^\s+|\s+$/g, '')

   // Make the string lowercase
   str = str.toLowerCase()

   // Remove accents, swap ñ for n, etc
   var from =
      'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
   var to =
      'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
   for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
   }

   // Remove invalid chars
   str = str
      .replace(/[^a-z0-9 -]/g, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-')

   return str
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
