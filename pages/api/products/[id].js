import Listing from '../../../models/Listing'
import Product from '../../../models/Product'

export default async function (req, res) {
    const { id } = req.query
    const product = await Product.findById(id)

    const listingsContent = []

    for (let i = 0; i < product.listings.length; i++) {
        listingsContent.push(await Listing.findById(product['listings'][i]))
    }

    product.listings = listingsContent

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).send('Product not found.')
    }
}
