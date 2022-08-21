import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import Product from '../../../models/Product'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { productID } = req.body

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        user.cart.push(productID)
        await user.save()

        res.status(200).send({ cart: user.cart })
    } else {
        res.status(404).send('User not found.')
    }
}
