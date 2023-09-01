import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyAccess } from 'lib/jwt'
import Auth from 'middlewares/Auth'
import { getRequestBody } from 'lib/utils'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyAccess({
            req,
            secret: process.env.ACCESS_TOKEN_SECRET,
        })

        const { productId } = getRequestBody(req)

        const user = await prisma.user.update({
            where: { id },
            data: {
                wishlist: {
                    connect: { id: productId },
                },
            },
            include: { wishlist: true },
        })

        return res.status(200).json({ wishlist: user?.wishlist })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
