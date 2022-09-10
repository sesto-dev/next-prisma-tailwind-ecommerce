import connectDB from '../../../helpers/connectDB'
import processCart from '../../../helpers/processCart'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        if (req.method == 'POST') {
            const { referralCode: referral_code } = req.body
            const referredUser = await User.findOne({ referral_code })

            if (referredUser && referredUser != user) {
                user.cart.referral_code = referral_code
            }
        }

        if (req.method == 'DELETE') {
            user.cart.referral_code = null
        }

        await user.save()
        const cart = await processCart({ user })

        res.status(200).json({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
