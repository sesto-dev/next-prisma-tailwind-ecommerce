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
        phone: { type: String },
        password: {
            type: String,
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        integrations: {
            google: {
                id: {
                    type: String,
                },
                email: {
                    type: String,
                },
                verified_email: {
                    type: Boolean,
                },
                name: {
                    type: String,
                },
                picture: {
                    type: String,
                },
                locale: {
                    type: String,
                },
            },
        },
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
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isPhoneVerified: {
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
