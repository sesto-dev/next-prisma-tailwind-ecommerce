import type { NextApiRequest, NextApiResponse } from 'next'

import { signJWT } from 'lib/jwt'
import prisma from 'lib/prisma'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        let { email, OTP } = JSON.parse(req.body)

        email = email.toString().toLowerCase()

        const { id } = await prisma.user.findUniqueOrThrow({
            where: { email, OTP: OTP.toString() },
        })

        if (id) {
            await prisma.user.update({
                where: {
                    email,
                },
                data: {
                    isVerified: true,
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
                .json({ message: 'Incorrect Verification Code.' })
        }
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
