import mongoose from 'mongoose'
import connectDB from '../../../helpers/connectDB'
import populateCart from '../../../helpers/populateCart'
import verifyRequest from '../../../helpers/verifyRequest'
import Product from '../../../models/Product'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { listingID } = req.body

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        const filteredCart = user.cart.filter(function (value, index) {
            if (value.toString() != listingID) return value
        })

        user.cart = filteredCart
        await user.save()

        const cart = await populateCart({ user })

        res.status(200).send({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
