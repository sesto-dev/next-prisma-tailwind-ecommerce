import { sendForgotPassword } from 'angra'
import { generateVoucher } from 'apadana/src/generators'

import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'

export default async function (req, res) {
    connectDB()

    const { email } = req.body
    const user = await User.findOne({ email })

    if (user) {
        try {
            const code = await generateVoucher(1)
            user.reset_password_code = code
            await user.save()

            res.status(200).json({ message: 'Success' })
            await sendForgotPassword(config, email, code)
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    } else {
        res.status(401)
        throw new Error('User not found.')
    }
}
