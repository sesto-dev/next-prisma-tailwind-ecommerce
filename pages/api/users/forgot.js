import { sendForgotPassword } from 'angra'
import { generateVoucher } from 'apadana/src/generators'

import connectDB from '../../../helpers/connectDB'
import config from '../../../main.config'
import User from '../../../models/User'

export default async function (req, res) {
    connectDB()

    const { email } = req.body
    const user = await User.findOne({ email })
    const code = await generateVoucher(1)

    if (user) {
        try {
            user.reset_password_code = code
            await user.save()

            await sendForgotPassword(config, email, code)

            res.status(200).json({ message: 'Success' })
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    } else {
        res.status(401)
        throw new Error('User not found.')
    }
}
