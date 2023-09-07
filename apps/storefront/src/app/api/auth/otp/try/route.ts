import { sendVerifyMail } from '@persepolis/mail'
import prisma from '@/lib/prisma'
import { isEmailValid } from '@/lib/regex'
import { generateSerial } from '@/lib/serial'
import { getErrorResponse } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import Config from '@/config/site'

export async function POST(req: NextRequest) {
   try {
      const OTP = generateSerial({})

      const { email } = await req.json()

      if (isEmailValid(email)) {
         await prisma.user.upsert({
            where: { email: email.toString().toLowerCase() },
            update: {
               OTP,
            },
            create: {
               email: email.toString().toLowerCase(),
               OTP,
            },
         })

         await sendVerifyMail({
            name: Config.name,
            to: email,
            email_verification_code: OTP,
            unsubscribe_url: process.env.UNSUBSCRIBE_URL,
            verify_url: process.env.VERIFY_URL,
         })

         return new NextResponse(
            JSON.stringify({
               status: 'success',
               email,
            }),
            {
               status: 200,
               headers: { 'Content-Type': 'application/json' },
            }
         )
      }

      if (!isEmailValid(email)) {
         return getErrorResponse(400, 'Incorrect Email')
      }
   } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
         return getErrorResponse(400, 'failed validations', error)
      }

      return getErrorResponse(500, error.message)
   }
}
