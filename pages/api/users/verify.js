import connectDB from '../../../helpers/connectDB'

import User from '../../../models/User'

export default async function (req, res) {
    const { code } = req.body

    if (!code) {
        res.status(401).send('Input error!')
    }

    connectDB()

    const user = await User.findOne({ email_verification_code: code })

    if (user && !user.isEmailVerified) {
        if (code == user.email_verification_code) {
            user.email_verification_code = ''
            user.isEmailVerified = true
            await user.save()

            res.status(200).json('Success!')
        } else {
            res.status(401).send('Wrong Verification Code!')
        }
    } else {
        res.status(401).send('Fail')
    }
}
