import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

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

      const { productId } = await req.json()

      const user = await prisma.user.update({
         where: { id: userId },
         data: {
            wishlist: {
               connect: {
                  id: productId,
               },
            },
         },
         include: { wishlist: true },
      })

      return NextResponse.json(user.wishlist)
   } catch (error) {
      console.error('WISHLIST_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId } = await req.json()

      const user = await prisma.user.update({
         where: { id: userId },
         data: {
            wishlist: {
               disconnect: {
                  id: productId,
               },
            },
         },
         include: { wishlist: true },
      })

      return NextResponse.json(user.wishlist)
   } catch (error) {
      console.error('WISHLIST_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
