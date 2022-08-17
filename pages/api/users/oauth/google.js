import querystring from 'querystring'
import axios from 'axios'
import { generateVoucher } from 'apadana/src/generators'
import { sendVerifyMail } from 'angra'

import connectDB from '../../../../helpers/connectDB'
import { bakeAJWT } from '../../../../helpers/bakeCookies'

import User from '../../../../models/User'
import config from '../../../../config/main.config'

export default async function (req, res) {
    const { id_token, access_token } = await getTokens({ code: req.query.code })

    if (!access_token) res.redirect(502, '/')

    const { id, email, verified_email, name, picture, locale } = await getUser({
        id_token,
        access_token,
    })

    if (!email) res.redirect(502, '/')

    connectDB()

    const exists = await User.findOne({ email })

    if (exists) {
        if (!exists.integration || !exists.integration.google) {
            exists.integration = {
                google: {
                    id,
                    email,
                    verified_email,
                    name,
                    picture,
                    locale,
                },
            }

            if (!exists.name) exists.name = name
            if (exists.email == email && verified_email)
                exists.isEmailVerified = true

            await exists.save()
        }

        const AJWT = await bakeAJWT(exists, 'Lax')
        res.setHeader('Set-Cookie', AJWT)
        res.redirect(302, '/')
    } else {
        const email_verification_code = await generateVoucher(1)
        const referral_code = await generateVoucher(3)

        const user = await User.create({
            name: name && name,
            email,
            email_verification_code: verified_email && email_verification_code,
            referral_code,
            isEmailVerified: verified_email,
            integrations: {
                google: {
                    id,
                    email,
                    verified_email,
                    name,
                    picture,
                    locale,
                },
            },
        })

        if (user) {
            const AJWT = await bakeAJWT(user, 'Lax')

            if (!verified_email)
                await sendVerifyMail(
                    config.meta.title,
                    email,
                    email_verification_code,
                    config.urls.verify,
                    config.urls.unsubscribe
                )

            res.setHeader('Set-Cookie', AJWT)
            res.redirect(302, '/')
        } else {
            res.redirect(302, '/auth/error')
        }
    }
}

async function getTokens({ code }) {
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
    }

    return axios
        .post(url, querystring.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then((res) => res.data)
        .catch((error) => {
            throw new Error(error.message)
        })
}

async function getUser({ id_token, access_token }) {
    return await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        )
        .then((res) => res.data)
        .catch((error) => {
            console.error(`Failed to fetch user`)
            throw new Error(error.message)
        })
}
