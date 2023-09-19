import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const addresses = await prisma.address.findMany({
         where: {
            userId,
         },
      })

      return NextResponse.json(addresses)
   } catch (error) {
      console.error('[ADDRESSES_GET]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { address, city, phone, postalCode } = await req.json()

      const object = await prisma.address.create({
         data: {
            user: {
               connect: {
                  id: userId,
               },
            },
            city,
            address,
            phone,
            postalCode,
         },
      })

      return NextResponse.json(object)
   } catch (error) {
      console.error('[ADDRESS_POST]', error)
      return new NextResponse('Internal error', { status: 500 })
   }
}
