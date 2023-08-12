import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { IdentifyRequest } from 'lib/jwt'
import Auth from 'middlewares/Auth'

export default Auth(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { id } = await IdentifyRequest({ req })

        const messages = await prisma.cart.update({
            where: { userId: id },
            data: {},
        })

        return res.status(200).json({ messages })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
})
