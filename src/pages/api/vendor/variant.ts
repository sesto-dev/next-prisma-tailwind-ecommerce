import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { vendorVariantId } = JSON.parse(req.body)

        const vendorVariant = await prisma.vendorVariant.findUniqueOrThrow({
            where: {
                id: vendorVariantId,
            },
            include: {
                vendor: true,
                productVariant: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return res.status(200).json({ vendorVariant })
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
