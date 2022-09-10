import connectDB from '../../helpers/connectDB'
import Listing from '../../models/Listing'
import Product from '../../models/Product'

export async function getProductByID({ id }) {
    connectDB()

    const product = await Product.findById(id)

    const listingsContent = []

    for (let i = 0; i < product.listings.length; i++) {
        listingsContent.push(await Listing.findById(product['listings'][i]))
    }

    product.listings = listingsContent

    return JSON.parse(JSON.stringify(product, null, 2))
}
