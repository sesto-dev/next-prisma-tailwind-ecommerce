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

        const cart = await prisma.cart.findUniqueOrThrow({
            where: { userId: id },
            include: {
                items: {
                    include: {
                        vendorVariant: {
                            include: {
                                productVariant: { include: { product: true } },
                            },
                        },
                    },
                },
            },
        })

        return res.status(200).json({ cart })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
