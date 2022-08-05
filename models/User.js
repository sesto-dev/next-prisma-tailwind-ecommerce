import mongoose from 'mongoose'

const user = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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
