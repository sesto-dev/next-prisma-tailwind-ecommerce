const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { users, products } = require('../config/seeder.config.js')
const Order = require('../models/Order.js')
const Product = require('../models/Product.js')
const User = require('../models/User.js')

dotenv.config()

mongoose.connect(process.env.MONGO_ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const importData = async () => {
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
