import type { NextApiRequest, NextApiResponse } from 'next'

import { signJWT } from 'lib/jwt'
import prisma from 'lib/prisma'
import { getRequestBody, isVariableValid } from 'lib/utils'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        let { email, OTP } = getRequestBody(req)

        email = email.toString().toLowerCase()

        const { id } = await prisma.user.findUniqueOrThrow({
            where: { email, OTP: OTP.toString() },
        })

        if (isVariableValid(id)) {
            const user = await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    isEmailVerified: true,
                    OTP: null,
                },
            })

            return res.status(200).json({
                Email: email,
                AccessToken: await signJWT({
                    id,
                    secret: process.env.ACCESS_TOKEN_SECRET,
                    expiresIn: '30d',
                }),
                RefreshToken: await signJWT({
                    id,
                    secret: process.env.REFRESH_TOKEN_SECRET,
                    expiresIn: '30d',
                }),
            })
        } else {
            return res
                .status(401)
                .json({ error: 'Incorrect Verification Code.' })
        }
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
