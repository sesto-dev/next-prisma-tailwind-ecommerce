import Listing from '../models/Listing'
import Product from '../models/Product'

export default async function ({ user }) {
    let cart = []

    const { cart: cartIDs } = user

    const stringIDs = cartIDs.map((id) => id.toString())
    stringIDs.sort((a, b) => a.localeCompare(b))

    const uniqueIDs = stringIDs.filter((x, i, a) => a.indexOf(x) == i)

    for (let i = 0; i < uniqueIDs.length; i++) {
        const listingID = uniqueIDs[i]
        const listing = await Listing.findById(listingID.toString())

        const { product: productID } = listing
        const product = await Product.findById(productID.toString())

        cart.push({ listing, product })
    }

    for (let j = 0; j < cart.length; j++) {
        cart[j]['count'] = stringIDs.filter((x) => x == uniqueIDs[j]).length
    }

    return cart
}
