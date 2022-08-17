import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'

import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        const {
            name,
            email,
            cart,
            wallet,
            phone,
            referral_code,
            isEmailVerified,
            isPhoneVerified,
            integrations,
        } = user

        res.status(200).json({
            name,
            email,
            cart,
            wallet,
            phone,
            referral_code,
            isEmailVerified,
            isPhoneVerified,
            integrations,
        })
    } else {
        res.status(401).send('Fail')
    }
}
