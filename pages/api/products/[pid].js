import Product from '../../../models/Product'

export default async function (req, res) {
    const { pid } = req.query
    const product = await Product.findById(pid)
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404)
    }
}
