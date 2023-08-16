import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyRequest } from 'lib/jwt'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyRequest({ req })

        const wishlist = await prisma.wishlist.findUniqueOrThrow({
            where: { userId: id },
            include: { items: true },
        })

        console.log({ wishlist })

        return res.status(200).json({ wishlist })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
