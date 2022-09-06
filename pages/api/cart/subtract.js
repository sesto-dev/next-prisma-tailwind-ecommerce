import mongoose from 'mongoose'
import connectDB from '../../../helpers/connectDB'
import populateCart from '../../../helpers/populateCart'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { listingID } = req.body

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        const index = user.cart.items.indexOf(
            mongoose.Types.ObjectId(listingID)
        )

        if (index > -1) {
            user.cart.items.splice(index, 1)
            await user.save()

            const cart = await populateCart({ user })

            res.status(200).send({ cart })
        } else {
            res.status(404).send('Listing not found in cart.')
        }
    } else {
        res.status(404).send('User not found.')
    }
}
