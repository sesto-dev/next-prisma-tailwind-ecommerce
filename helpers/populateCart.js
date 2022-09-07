import Listing from '../models/Listing'
import Product from '../models/Product'

export default async function ({ user }) {
    let items = [],
        totalCost = 0,
        discountCost = 0,
        hasPhysical = false

    const stringIDs = user.cart.items.map((id) => id.toString())
    stringIDs.sort((a, b) => a.localeCompare(b))

    const uniqueIDs = stringIDs.filter((x, i, a) => a.indexOf(x) == i)

    for (let i = 0; i < uniqueIDs.length; i++) {
        const listingID = uniqueIDs[i]
        const listing = await Listing.findById(listingID.toString())

        const { product: productID } = listing
        const product = await Product.findById(productID.toString())

        items.push({ listing, product })
    }

    for (let j = 0; j < items.length; j++) {
        const element = items[j]

        const count = stringIDs.filter((x) => x == uniqueIDs[j]).length
        element.count = count
        totalCost += element.listing.price * count

        if (element.product.physical) hasPhysical = true
    }

    const payableCost = totalCost - discountCost

    return {
        items,
        totalCost,
        payableCost,
        discountCost,
        hasPhysical,
        referralCode: user.cart.referral_code,
        discountCode: user.cart.discount_code,
    }
}
