import bcrypt from 'bcryptjs'
import { generateVoucher } from 'apadana/src/generators'
import { sendVerifyMail } from 'angra'

import connectDB from '../../../helpers/connectDB'
import bakeCookie from '../../../helpers/bakeCookie'
import isEmail from '../../../helpers/isEmail'

import User from '../../../models/User'
import config from '../../../config/main.config'

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
            const serialized = await bakeCookie(user)

            await sendVerifyMail(
                config.meta.title,
                email,
                email_verification_code,
                config.urls.verify,
                config.urls.unsubscribe
            )

            res.setHeader('Set-Cookie', serialized)
            res.status(200).json('Success!')
        } else {
            res.status(401).send('Failed to create user.')
        }
    }
}
