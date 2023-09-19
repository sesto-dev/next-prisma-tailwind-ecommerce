import { signJWT } from '@/lib/jwt'
import prisma from '@/lib/prisma'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: NextRequest) {
   try {
      const expiryMinutes = 30 * 24 * 60

      let { email, OTP } = await req.json()

      email = email.toString().toLowerCase()

      const user = await prisma.owner.findFirstOrThrow({
         where: { email, OTP },
      })

      const token = await signJWT(
         { sub: user.id },
         { exp: `${expiryMinutes}m` }
      )

      const tokenMaxAge = expiryMinutes * 60
      const cookieOptions = {
         name: 'token',
         value: token,
         httpOnly: true,
         path: '/',
         secure: process.env.NODE_ENV !== 'development',
         maxAge: tokenMaxAge,
      }

      const response = new NextResponse(
         JSON.stringify({
            status: 'success',
            token,
         }),
         {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
         }
      )

      await Promise.all([
         response.cookies.set(cookieOptions),
         response.cookies.set({
            name: 'logged-in',
            value: 'true',
            maxAge: tokenMaxAge,
         }),
      ])

      return response
   } catch (error: any) {
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error.message)
   }
}
