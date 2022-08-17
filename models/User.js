const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
        name: {
            type: String,
        },
        wallet: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isPremium: {
            type: Boolean,
            required: true,
            default: false,
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isSubscribed: {
            type: Boolean,
            required: true,
            default: true,
        },
        isKYC: {
            type: Boolean,
            required: true,
            default: false,
        },
        referral_code: {
            type: String,
            required: true,
            unique: true,
        },
        email_verification_code: {
            type: String,
        },
        reset_password_code: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', user)

module.exports = User
