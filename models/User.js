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
        verificationCode: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', user)

export default User
