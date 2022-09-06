import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import Discount from '../../../models/Discount'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { code } = req.body

    connectDB()

    const user = await User.findById(decoded.id)
    const discount = await Discount.findOne(code)

    if (user && discount && discount.uses < discount.count) {
        user.cart.discount_code = code
        await user.save()

        res.status(200).send('Success')
    } else {
        res.status(404).send('User not found.')
    }
}
