import type { NextApiRequest, NextApiResponse } from 'next'

import { signJWT, verifyAndGetJWTPayload } from 'lib/jwt'

export default async function API(req: NextApiRequest, res: NextApiResponse) {
    try {
        const authHeader = req.headers['authorization']

        const token =
            authHeader && authHeader.startsWith('Bearer ')
                ? authHeader.split(' ')[1]
                : null

        if (token == null) return res.status(401)

        const { id } = await verifyAndGetJWTPayload({
            token,
            secret: process.env.REFRESH_TOKEN_SECRET,
        })

        if (id) {
            return res.status(200).json({
                AccessToken: await signJWT({
                    id,
                    secret: process.env.ACCESS_TOKEN_SECRET,
                    expiresIn: '30d',
                }),
            })
        } else {
            return res
                .status(401)
                .json({ message: 'Incorrect Authentication.' })
        }
    } catch (error) {
        const message = error.message
        return res.status(400).json({ error, message })
    }
}
