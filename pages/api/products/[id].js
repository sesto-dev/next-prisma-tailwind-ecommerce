import Product from '../../../models/Product'

export default async function (req, res) {
    const { id } = req.query
    const product = await Product.findById(id)

    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).send('Product not found.')
    }
}
