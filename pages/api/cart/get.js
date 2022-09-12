import connectDB from '../../../helpers/connectDB'
import processCart from '../../../helpers/processCart'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        const cart = await processCart({ user })
        res.status(200).json(cart)
    } else {
        res.status(404).send('User not found.')
    }
}
