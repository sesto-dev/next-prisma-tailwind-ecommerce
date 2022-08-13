import mongoose from 'mongoose'

const user = mongoose.Schema(
    {
        name: {
            type: String,
        },
        credit: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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

export default User
