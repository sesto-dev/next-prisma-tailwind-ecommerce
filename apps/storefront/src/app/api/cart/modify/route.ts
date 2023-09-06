import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function DELETE(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId } = await req.json()

      await prisma.cartItem.delete({
         where: { UniqueCartItem: { cartId: userId, productId } },
      })

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

export async function PATCH(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId, increment } = await req.json()

      await prisma.cartItem.update({
         where: {
            UniqueCartItem: {
               cartId: userId,
               productId,
            },
         },
         data: {
            count: increment ? { increment: 1 } : { decrement: 1 },
         },
      })

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

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { productId } = await req.json()

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
               connectOrCreate: {
                  where: {
                     UniqueCartItem: {
                        productId,
                        cartId: userId,
                     },
                  },
                  create: {
                     productId,
                     count: 1,
                  },
               },
            },
         },
      })

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
