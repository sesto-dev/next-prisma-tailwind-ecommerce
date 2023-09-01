import type { NextApiRequest, NextApiResponse } from 'next'

import { sendVerifyMail } from '@persepolis/mail/dist'
import prisma from 'lib/prisma'
import { isEmailValid } from 'lib/regex'
import { generateSerial } from 'lib/serial'
import { getRequestBody } from 'lib/utils'
import Config from 'config/site'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const OTP = generateSerial({})

        const { email } = getRequestBody(req)

        if (isEmailValid(email)) {
            await prisma.user.upsert({
                where: { email },
                update: {
                    OTP,
                },
                create: {
                    email,
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

            return res.status(200).json({
                email,
            })
        }

        if (!isEmailValid(email)) {
            return res.status(401).json({ error: 'Incorrect Email.' })
        }
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
