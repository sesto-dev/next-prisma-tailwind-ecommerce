import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

import config from '../../../main.config'
import { generateVoucher } from 'apadana/src/generators'
import bakeCookie from '../../../helpers/bakeCookie'
import { sendVerifyMail } from 'angra'

export default async function (req, res) {
    connectDB()

    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const salted = await bcrypt.hash(password, salt)

    const code = await generateVoucher(1)

    const user = await User.create({
        email,
        password: salted,
        verification_code: code,
    })

    if (user) {
        const serialized = await bakeCookie(user)

        res.setHeader('Set-Cookie', serialized)
        res.status(200).json({ message: 'Success!' })
    } else {
        res.status(401)
        throw new Error('Failed to create user.')
    }

    if (user) {
        await sendVerifyMail(config, email, code)
    }
}
