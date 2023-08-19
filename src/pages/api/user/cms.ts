import type { NextApiRequest, NextApiResponse } from 'next'

import { IdentifyAccess } from 'lib/jwt'
import prisma from 'lib/prisma'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyAccess({
            req,
            secret: process.env.ACCESS_TOKEN_SECRET,
        })

        const user = await prisma.user.findUnique({
            where: { id, isEmailVerified: true },
            include: {
                vendor: true,
            },
        })

        return res.status(200).json({ user })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
