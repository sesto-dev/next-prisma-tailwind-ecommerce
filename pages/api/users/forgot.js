import { sendForgotPassword } from 'angra'
import { generateVoucher } from 'apadana/src/generators'

import connectDB from '../../../helpers/connectDB'
import { isEmail } from 'aryana'

import User from '../../../models/User'
import config from '../../../config/main.config'
import i18n from '../../../config/i18n.config'

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
                i18n.meta.title.en,
                email,
                code,
                process.env.NEXT_PUBLIC_URL + config.routes.frontend.reset,
                process.env.NEXT_PUBLIC_URL + config.routes.frontend.unsubscribe
            )

            res.status(200).json('Success!')
        } catch (error) {
            res.status(401).send('Please try again later.')
        }
    } else {
        res.status(200).json('Success!')
    }
}
