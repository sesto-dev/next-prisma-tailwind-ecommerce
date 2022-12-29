import prisma from 'lib/prisma'
import { createSerialNumber } from 'lib/serial'
import cookie from 'lib/cookie'

import { getGoogleTokens, getGoogleUser } from 'lib/google'

export default async function (req, res) {
    const { id_token, access_token } = await getGoogleTokens({
        code: req.query.code,
    })

    if (!id_token || !access_token) {
        return res.redirect(502, '/')
    }

    const { id, email, name } = await getGoogleUser({
        id_token,
        access_token,
    })

    if (!email) {
        return res.redirect(502, '/')
    }

    const exists = await prisma.user.findUnique({
        where: { email },
    })

    if (exists) {
        const AJWT = await cookie({
            id,
            sameSite: 'Lax',
        })

        return res.setHeader('Set-Cookie', AJWT).redirect(302, '/user')
    }

    if (!exists) {
        const referralCode = await createSerialNumber(3)

        const user = await prisma.user.create({
            data: {
                email,
                name: name && name,
                referralCode,
            },
        })

        if (user) {
            const AJWT = await cookie({
                id,
                sameSite: 'Lax',
            })

            return res.setHeader('Set-Cookie', AJWT).redirect(302, '/user')
        } else {
            return res.redirect(302, '/auth/error')
        }
    }
}
