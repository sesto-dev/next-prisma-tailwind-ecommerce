const mongoose = require('mongoose')

const order = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        referral: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.models.Order || mongoose.model('Order', order)

module.exports = Order
