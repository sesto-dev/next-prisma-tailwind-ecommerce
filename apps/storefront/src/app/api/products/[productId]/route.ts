import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET(
   req: Request,
   { params }: { params: { productId: string } }
) {
   try {
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
