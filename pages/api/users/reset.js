import bcrypt from 'bcryptjs'
import { sendResetPassword } from 'angra'

import connectDB from '../../../helpers/connectDB'

import User from '../../../models/User'
import config from '../../../config/main.config'

export default async function (req, res) {
    const { code, password } = req.body

    if (!code || !password) res.status(400).send('Input error!')
    if (password.length < 8) res.status(400).send('Input error!')

    connectDB()
    const user = await User.findOne({ reset_password_code: code })

    if (user) {
        try {
            if (await bcrypt.compare(password, user.password)) {
                res.status(400).send(
                    'New password cannot be the same as the old password!'
                )
            } else {
                const salt = await bcrypt.genSalt(10)
                const salted = await bcrypt.hash(password, salt)

                user.reset_password_code = ''
                user.password = salted
                await user.save()

                await sendResetPassword(
                    config.meta.title,
                    user.email,
                    config.urls.unsubscribe
                )

                res.status(200).json('Success!')
            }
        } catch (error) {
            res.status(401).send('Please try again later!')
        }
    } else {
        res.status(401).send('Incorrect code.')
    }
}
