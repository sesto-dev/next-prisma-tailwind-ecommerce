import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.user.findUnique({
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
            orders: true,
            addresses: true,
            payments: true,
            wishlist: true,
            notifications: true,
            errors: true,
         },
      })

      return NextResponse.json(user)
   } catch (error) {
      console.error('[PRODUCT_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
