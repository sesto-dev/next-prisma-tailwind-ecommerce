import { gateAdmin } from 'lib/gateway'
import prisma from 'lib/prisma'

export default async function (req, res) {
    const admin = gateAdmin(req, res)

    const { title, description, brand, isPhysical, images, categories } =
        req.body

    if (title) {
        return res.status(200).json(title)
    } else {
    }
}
