import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { getRequestBody } from 'lib/utils'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = getRequestBody(req)

        const product = await prisma.product.findUniqueOrThrow({
            where: { id },
            include: {
                categories: true,
                brand: true,
            },
        })

        return res.status(200).json({
            product,
        })
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
}
