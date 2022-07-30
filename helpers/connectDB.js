import mongoose from 'mongoose'

const connectDB = async () =>
    mongoose.connect(process.env.MONGO_ATLAS_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    })

export default connectDB
