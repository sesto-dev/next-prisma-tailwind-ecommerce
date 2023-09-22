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
            isEmailSubscribed: true,
         },
      })

      return NextResponse.json({
         email: user.email,
         isEmailSubscribed: user.isEmailSubscribed,
      })
   } catch (error) {
      const message = error.message
      return new NextResponse('Internal error', { status: 500 })
   }
}

export async function DELETE(req: Request) {
   try {
      const { emailUnsubscribeToken } = await req.json()

      const user = await prisma.user.update({
         where: {
            emailUnsubscribeToken,
         },
         data: {
            isEmailSubscribed: false,
         },
      })

      return NextResponse.json({
         email: user.email,
         isEmailSubscribed: user.isEmailSubscribed,
      })
   } catch (error) {
      const message = error.message
      return new NextResponse('Internal error', { status: 500 })
   }
}
