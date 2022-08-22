const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: String,
        brand: String,
        publisher: String,
        developer: String,
        category: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        listings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Listing',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Product =
    mongoose.models.Product || mongoose.model('Product', productSchema)

module.exports = Product
