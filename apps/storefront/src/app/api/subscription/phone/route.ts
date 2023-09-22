import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            isPhoneSubscribed: true,
         },
      })

      return NextResponse.json({
         phone: user.phone,
         isPhoneSubscribed: user.isPhoneSubscribed,
      })
   } catch (error) {
      const message = error.message
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const user = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            isPhoneSubscribed: false,
         },
      })

      return NextResponse.json({
         phone: user.phone,
         isPhoneSubscribed: user.isPhoneSubscribed,
      })
   } catch (error) {
      const message = error.message
      return new NextResponse('Internal error', { status: 500 })
   }
}
