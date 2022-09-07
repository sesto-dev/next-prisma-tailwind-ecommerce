import connectDB from '../../../helpers/connectDB'
import processCart from '../../../helpers/processCart'
import verifyRequest from '../../../helpers/verifyRequest'
import Discount from '../../../models/Discount'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        if (req.method == 'POST') {
            const { discountCode } = req.body
            const discount = await Discount.findOne({ discountCode })

            if (discount && discount.uses < discount.credit) {
                user.cart.discount_code = discountCode
            }
        }

        if (req.method == 'DELETE') {
            user.cart.discount_code = null
        }

        await user.save()
        const cart = await processCart({ user })

        res.status(200).json({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
