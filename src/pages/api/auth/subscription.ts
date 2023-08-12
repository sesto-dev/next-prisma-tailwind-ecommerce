import prisma from 'lib/prisma'

export default async function (req, res) {
    return res.status(200).json({
        Success: true,
        Message: 'Email Subscription successfully modified.',
    })
}
