import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyAccess } from 'lib/jwt'
import Auth from 'middlewares/Auth'
import { getRequestBody, isVariableValid } from 'lib/utils'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyAccess({
            req,
            secret: process.env.ACCESS_TOKEN_SECRET,
        })

        const { addressId } = getRequestBody(req) ?? null

        const cart = await prisma.cart.findUniqueOrThrow({
            where: {
                userId: id,
            },
            include: {
                items: {
                    include: {
                        listing: {
                            include: {
                                subproduct: { include: { product: true } },
                            },
                        },
                    },
                },
            },
        })

        const order = await prisma.order.create({
            data: {
                userId: id,
                status: 'Processing',
                payableAmount: 10,
                discountedAmount: 0,
            },
        })
        return res.status(200).json({ cart })
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
})
