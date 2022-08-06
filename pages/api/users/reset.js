import bcrypt from 'bcryptjs'
import { sendResetPassword } from 'angra'

import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'
import config from '../../../main.config'

export default async function (req, res) {
    connectDB()

    const { code, password } = req.body
    const user = await User.findOne({ reset_password_code: code })

    if (user) {
        try {
            const salt = await bcrypt.genSalt(10)
            const salted = await bcrypt.hash(password, salt)

            user.reset_password_code = ''
            user.password = salted
            await user.save()

            await sendResetPassword(config, user.email, code)

            res.status(200).json({ message: 'Success' })
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    } else {
        res.status(401)
        throw new Error('Incorrect Code.')
    }
}
