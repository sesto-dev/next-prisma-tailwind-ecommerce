import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import Product from '../../../models/Product'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        let cartArray = []

        const { cart } = user

        for (let i = 0; i < cart.length; i++) {
            const productID = cart[i]
            const product = await Product.findById(productID.toString())
            cartArray.push(product)
        }

        res.status(200).json({ cartArray })
    } else {
        res.status(404).send('Fail')
    }
}
