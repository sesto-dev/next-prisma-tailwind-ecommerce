import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                subproducts: { include: { listings: true } },
                categories: true,
            },
        })

        return res.status(200).json({
            products,
        })
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
