import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const cart = await prisma.cart.findUniqueOrThrow({
         where: { userId },
         include: {
            items: {
               include: {
                  product: {
                     include: {
                        brand: true,
                        categories: true,
                     },
                  },
               },
            },
         },
      })

      return NextResponse.json(cart)
   } catch (error) {
      console.error('[GET_CART]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId, count } = await req.json()

      if (count < 1) {
         await prisma.cartItem.delete({
            where: { UniqueCartItem: { cartId: userId, productId } },
         })
      } else {
         await prisma.cart.upsert({
            where: {
               userId,
            },
            create: {
               user: {
                  connect: {
                     id: userId,
                  },
               },
            },
            update: {
               items: {
                  upsert: {
                     where: {
                        UniqueCartItem: {
                           cartId: userId,
                           productId,
                        },
                     },
                     update: {
                        count,
                     },
                     create: {
                        productId,
                        count,
                     },
                  },
               },
            },
         })
      }

      const cart = await prisma.cart.findUniqueOrThrow({
         where: {
            userId,
         },
         include: {
            items: {
               include: {
                  product: true,
               },
            },
         },
      })

      return NextResponse.json(cart)
   } catch (error) {
      console.error('[PRODUCT_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
