import { generateVoucher } from 'apadana/src/generators'
import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'
import { sendResetPassword } from 'angra'

export default async function (req, res) {
    connectDB()

    const { code, password } = req.body
    const user = await User.findOne({ reset_password_code: code })

    if (user) {
        try {
            user.password = password
            await user.save()

            await sendResetPassword(config, user.email, code)
        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    } else {
        res.status(401)
        throw new Error('Incorrect Code.')
    }
}
