import prisma from 'lib/prisma'
import { getDiscordTokens, getDiscordUser } from 'lib/discord'

export default async function (req, res) {
    const { id: parsedId } = JSON.parse(req.query.state)

    const { access_token } = await getDiscordTokens({
        code: req.query.code,
    })

    if (!parsedId || !access_token) {
        return res.redirect(502, '/')
    }

    const { id, username, avatar, email } = await getDiscordUser({
        access_token,
    })

    if (!email) {
        return res.redirect(502, '/')
    }

    const exists = await prisma.user.findUnique({
        where: { discordId: id },
    })

    if (exists) {
        return res.redirect(502, '/')
    }

    if (!exists) {
        const user = await prisma.user.findUnique({
            where: { id: parsedId },
        })

        if (user)
            await prisma.user.update({
                where: {
                    id: user.id.toString(),
                },
                data: {
                    discordId: id,
                },
            })

        if (user) {
            return res.redirect(302, '/user')
        } else {
            return res.redirect(302, '/auth/error')
        }
    }
}
