import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   req: Request,
   { params }: { params: { productId: string } }
) {
   try {
      if (!params.productId) {
         return new NextResponse('Product id is required', { status: 400 })
      }

      const product = await prisma.product.findUniqueOrThrow({
         where: { id: params.productId },
         include: {
            categories: true,
            brand: true,
         },
      })

      return NextResponse.json(product)
   } catch (error) {
      console.error('[PRODUCT_DELETE]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
