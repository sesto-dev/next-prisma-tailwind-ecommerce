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
        let cart = []
        const index = user.cart.indexOf(productID)

        if (index > -1) {
            user.cart.splice(index, 1)
            await user.save()

            for (let i = 0; i < user.cart.length; i++) {
                const productID = user['cart'][i]
                const product = await Product.findById(productID.toString())
                cart.push(product)
            }

            res.status(200).send({ cart })
        } else {
            res.status(404).send('Product not found in cart.')
        }
    } else {
        res.status(404).send('User not found.')
    }
}
