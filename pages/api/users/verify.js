import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'

import User from '../../../models/User'

export default async function (req, res) {
    const { code } = req.body

    if (!code) {
        res.status(401).send('Fail')
    }

    const decoded = await verifyRequest(req)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user && !user.isVerified) {
        if (code == user.email_verification_code) {
            user.email_verification_code = ''
            user.isVerified = true
            await user.save()

            res.status(200)
        } else {
            res.status(401).send('Wrong Verification Code!')
        }
    } else {
        res.status(401).send('Fail')
    }
}
