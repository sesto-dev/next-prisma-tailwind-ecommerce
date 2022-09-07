import mongoose from 'mongoose'
import connectDB from '../../../helpers/connectDB'
import processCart from '../../../helpers/processCart'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { listingID } = req.body

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        const filteredCart = user.cart.items.filter(function (value, index) {
            if (value.toString() != listingID) return value
        })

        user.cart.items = filteredCart
        await user.save()

        const cart = await processCart({ user })

        res.status(200).send({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
