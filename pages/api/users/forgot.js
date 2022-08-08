import { sendForgotPassword } from 'angra'
import { generateVoucher } from 'apadana/src/generators'

import connectDB from '../../../helpers/connectDB'
import isEmail from '../../../helpers/isEmail'

import User from '../../../models/User'
import config from '../../../main.config'

export default async function (req, res) {
    const { email } = req.body

    if (!email) res.status(400).send('Input error!')
    if (!isEmail(email)) res.status(400).send('Input error!')

    connectDB()

    const user = await User.findOne({ email })

    if (user) {
        try {
            const code = await generateVoucher(1)
            user.reset_password_code = code
            await user.save()

            await sendForgotPassword(
                config.meta.title,
                email,
                code,
                config.urls.reset,
                config.urls.unsubscribe
            )

            res.status(200).json('Success!')
        } catch (error) {
            res.status(401).send('Please try again later.')
        }
    } else {
        res.status(200).json('Success!')
    }
}
