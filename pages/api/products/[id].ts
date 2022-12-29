import prisma from 'lib/prisma'

export default async function (req, res) {
    const { id } = req.query

    if (id) {
        return res.status(200).json(id)
    } else {
        return res
            .status(404)
            .json({ Success: false, Message: 'Product not found.' })
    }
}
