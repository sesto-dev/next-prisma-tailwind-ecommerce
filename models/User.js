const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: String,
        credit: Number,
        password: String,
        email: {
            type: String,
            index: {
                unique: true,
                partialFilterExpression: { email: { $type: 'string' } },
            },
        },
        phone: {
            type: String,
            index: {
                unique: true,
                partialFilterExpression: { phone: { $type: 'string' } },
            },
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Listing',
            },
        ],
        address: [
            {
                type: String,
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
        email_verification_code: String,
        reset_password_code: String,
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User
