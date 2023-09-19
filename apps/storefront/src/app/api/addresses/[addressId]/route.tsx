import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
   req: Request,
   { params }: { params: { addressId: string } }
) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      if (!params.addressId) {
         return new NextResponse('addressId is required', { status: 400 })
      }

      const address = await prisma.address.findUniqueOrThrow({
         where: {
            userId,
            id: params.addressId,
         },
      })

      return NextResponse.json(address)
   } catch (error) {
      console.error('[ADDRESS_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
