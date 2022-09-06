import connectDB from '../../../helpers/connectDB'
import populateCart from '../../../helpers/populateCart'
import verifyRequest from '../../../helpers/verifyRequest'
import Listing from '../../../models/Listing'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    const { listingID } = req.body

    connectDB()

    const user = await User.findById(decoded.id)
    const listing = await Listing.findById(listingID)

    if (user && listing) {
        user.cart.items.push(listing._id)
        await user.save()

        const cart = await populateCart({ user })

        res.status(200).send({ cart })
    } else {
        res.status(404).send('User not found.')
    }
}
