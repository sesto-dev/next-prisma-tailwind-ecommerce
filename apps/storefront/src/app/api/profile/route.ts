import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.user.findUniqueOrThrow({
         where: { id: userId, isEmailVerified: true },
         include: {
            cart: {
               include: {
                  items: {
                     include: {
                        product: true,
                     },
                  },
               },
            },
            addresses: true,
            wishlist: true,
            notifications: true,
            errors: true,
         },
      })

      return NextResponse.json(user)
   } catch (error) {
      console.error('[PROFILE_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
