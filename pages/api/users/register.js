import bcrypt from 'bcryptjs'
import { generateVoucher } from 'apadana/src/generators'
import { sendVerifyMail } from 'angra'

import connectDB from '../../../helpers/connectDB'
import { bakeAJWT } from '../../../helpers/bakeCookies'
import { isEmail } from 'aryana'

import User from '../../../models/User'
import config from '../../../config/main.config'
import i18n from '../../../config/i18n.config'

export default async function (req, res) {
    const { email, password } = req.body

    if (!email || !password) res.status(400).send('Input error!')
    if (!isEmail(email) || password.length < 8)
        res.status(400).send('Input error!')

    connectDB()
    const exists = await User.findOne({ email })

    if (exists) {
        res.status(400).send('Email is already registered!')
    } else {
        const salt = await bcrypt.genSalt(10)
        const salted = await bcrypt.hash(password, salt)

        const email_verification_code = await generateVoucher(1)
        const referral_code = await generateVoucher(3)

        const user = await User.create({
            email,
            password: salted,
            email_verification_code,
            referral_code,
        })

        if (user) {
            const AJWT = await bakeAJWT(user, 'Strict')

            await sendVerifyMail(
                i18n.meta.title.en,
                email,
                email_verification_code,
                process.env.NEXT_PUBLIC_URL + config.routes.frontend.verify,
                process.env.NEXT_PUBLIC_URL + config.routes.frontend.unsubscribe
            )

            res.setHeader('Set-Cookie', AJWT)
            res.status(200).json('Success!')
        } else {
            res.status(401).send('Failed to create user.')
        }
    }
}
