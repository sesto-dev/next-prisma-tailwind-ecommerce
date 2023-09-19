import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const products = await prisma.product.findMany({
         include: {
            brand: true,
            categories: true,
         },
      })

      return NextResponse.json(products)
   } catch (error) {
      console.error('[PRODUCT_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
