const mongoose = require('mongoose')

const listingSchema = mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        color: String,
        size: String,
        platform: String,
        region: String,
        price: { type: Number, default: 1000 },
        stock: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
)

const Listing =
    mongoose.models.Listing || mongoose.model('Listing', listingSchema)

module.exports = Listing
