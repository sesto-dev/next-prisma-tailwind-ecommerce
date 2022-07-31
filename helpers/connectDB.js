import mongoose from 'mongoose'

export default function () {
    mongoose.connect(process.env.MONGO_ATLAS_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
}
