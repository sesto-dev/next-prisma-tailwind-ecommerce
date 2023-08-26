import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'lib/prisma'
import { getRequestBody } from 'lib/utils'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { listingId } = getRequestBody(req)

        const listing = await prisma.listing.findUniqueOrThrow({
            where: {
                id: listingId,
            },
            include: {
                vendor: true,
                subproduct: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        return res.status(200).json({ listing })
    } catch (error) {
        const message = error.message
        console.error({ error, message })
        return res.status(400).json({ error, message })
    }
}
