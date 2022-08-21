import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import Product from '../../../models/Product'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        let cart = []

        const { cart: cartIDs } = user

        for (let i = 0; i < cartIDs.length; i++) {
            const productID = cartIDs[i]
            const product = await Product.findById(productID.toString())
            cart.push(product)
        }

        res.status(200).json({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
