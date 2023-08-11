import prisma from 'lib/prisma'

export default async function (req, res) {
    const { id, wallet } = req.body

    const exists = await prisma.user.findUnique({
        where: { wallet },
    })

    if (exists) {
        return res.status(200).json({ Success: true, Message: 'Success...' })
    }

    if (!exists) {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                wallet,
            },
        })

        if (user) {
            return res
                .status(200)
                .json({ Success: true, Message: 'Success...' })
        } else {
            return res.status(401).json({
                Success: false,
                Message: 'Failed to create User...',
            })
        }
    }
}
