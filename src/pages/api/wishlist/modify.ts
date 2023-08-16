import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyRequest } from 'lib/jwt'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyRequest({ req })
        const { variantId } = JSON.parse(req.body)

        if (req.method == 'DELETE') {
            const wishlist = await prisma.wishlist.update({
                where: {
                    userId: id,
                },
                data: {
                    items: {
                        disconnect: {
                            id: variantId,
                        },
                    },
                },
                include: {
                    items: true,
                },
            })

            return res.status(200).json({ wishlist })
        }

        if (req.method == 'POST') {
            const wishlist = await prisma.wishlist.update({
                where: {
                    userId: id,
                },
                data: {
                    items: {
                        connect: {
                            id: variantId,
                        },
                    },
                },
                include: {
                    items: true,
                },
            })

            return res.status(200).json({ wishlist })
        }
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
})
