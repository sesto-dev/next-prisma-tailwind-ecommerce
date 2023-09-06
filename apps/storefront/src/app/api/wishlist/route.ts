import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.user.findUniqueOrThrow({
         where: { id: userId },
         include: { wishlist: true },
      })

      return NextResponse.json(user.wishlist)
   } catch (error) {
      console.error('[WISHLIST_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId, connect } = await req.json()

      const user = await prisma.user.update({
         where: { id: userId },
         data: {
            wishlist: connect
               ? {
                    connect: { id: productId },
                 }
               : {
                    disconnect: { id: productId },
                 },
         },
         include: { wishlist: true },
      })

      return NextResponse.json(user.wishlist)
   } catch (error) {
      console.error('[PRODUCT_PATCH]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
