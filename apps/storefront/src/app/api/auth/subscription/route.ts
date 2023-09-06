import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function POST(req: Request) {
   try {
      const userId = req.headers.get('X-USER-ID')

      if (!userId) {
         return new NextResponse('Unauthorized', { status: 401 })
      }

      const { isEmailSubscribed, isPhoneSubscribed } = await req.json()

      const user = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            isPhoneSubscribed,
            isEmailSubscribed,
         },
      })

      return NextResponse.json(user)
   } catch (error) {
      const message = error.message
      return new NextResponse('Internal error', { status: 500 })
   }
}
