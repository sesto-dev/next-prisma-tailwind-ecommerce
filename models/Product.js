const mongoose = require('mongoose')

const product = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        publisher: {
            type: String,
        },
        developer: {
            type: String,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        versions: [
            {
                platform: { type: String },
                region: { type: String },
                price: { type: Number, default: 1000 },
                stock: { type: Number, default: 0 },
                discount: { type: Number, default: 0 },
            },
        ],
        tags: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.models.Product || mongoose.model('Product', product)

module.exports = Product
