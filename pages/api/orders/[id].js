import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import Order from '../../../models/Order'
import Product from '../../../models/Product'
import User from '../../../models/User'

export default async function (req, res) {
    const { id } = req.query

    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)
    const order = await Order.findById(id)

    if (user && order) {
        if (order.user.equals(user._id) || user.isAdmin) {
            let productsArray = []

            const {
                _id,
                products,
                taxPrice,
                totalPrice,
                isPaid,
                isDelivered,
                referral,
                createdAt,
            } = order

            for (let i = 0; i < products.length; i++) {
                const productID = products[i]
                const product = await Product.findById(productID.toString())
                productsArray.push(product)
            }

            res.status(200).json({
                _id,
                taxPrice,
                totalPrice,
                isPaid,
                isDelivered,
                referral,
                createdAt,
                productsArray,
            })
        } else {
            res.status(403).send('Fail')
        }
    } else {
        res.status(404).send('User not found.')
    }
}
