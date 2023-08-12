import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body

        const product = await prisma.product.findUniqueOrThrow({
            where: { id },
        })

        return res.status(200).json({
            product,
        })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
}
