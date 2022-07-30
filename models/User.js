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
    },
    {
        timestamps: true,
    }
)

mongoose.models = {}

const User = mongoose.model('User', user)

export default User
