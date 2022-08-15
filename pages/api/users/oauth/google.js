import querystring from 'querystring'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { generateVoucher } from 'apadana/src/generators'
import { sendVerifyMail } from 'angra'

import connectDB from '../../../../helpers/connectDB'
import { bakeAJWT } from '../../../../helpers/bakeCookies'

import User from '../../../../models/User'

export default async function (req, res) {
    const { id_token, access_token } = await getTokens({ code: req.query.code })

    if (!access_token) res.redirect(502, '/')

    const { id, email, verified_email, name } = await getUser({
        id_token,
        access_token,
    })

    if (!email) res.redirect(502, '/')

    connectDB()

    const exists = await User.findOne({ email })

    if (exists) {
        const AJWT = await bakeAJWT(exists)
        res.setHeader('Set-Cookie', AJWT)
    } else {
    }

    res.redirect(302, '/contact')
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
