import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyAccess } from 'lib/jwt'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyAccess({
            req,
            secret: process.env.ACCESS_TOKEN_SECRET,
        })

        const wishlist = await prisma.wishlist.findUniqueOrThrow({
            where: { userId: id },
            include: { items: true },
        })

        return res.status(200).json({ wishlist })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
