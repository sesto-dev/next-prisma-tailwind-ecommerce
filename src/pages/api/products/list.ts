import prisma from 'lib/prisma'

export default async function (req, res) {
    const take = 5

    if (take) {
        return res.status(200).json({
            take,
        })
    } else {
        return res.status(400).json({
            Success: false,
            Message: 'Internal error.',
        })
    }
}
