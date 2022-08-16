import connectDB from '../../../helpers/connectDB'
import Product from '../../../models/Product'

export default async function (req, res) {
    const pageSize = 15
    const { page = 1 } = req.body

    connectDB()

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) })
}
