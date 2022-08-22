const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { users, products } = require('../config/seeder.config.js')
const Order = require('../models/Order.js')
const Product = require('../models/Product.js')
const User = require('../models/User.js')
const Listing = require('../models/Listing.js')

dotenv.config()

mongoose.connect(process.env.MONGO_ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const importData = async () => {
    try {
        let userIDs = [],
            orders = []

        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        await Listing.deleteMany()

        const createdProducts = await Product.insertMany(products)

        for (let p = 0; p < products.length; p++) {
            const product = products[p]
            const createdProduct = createdProducts[p]
            const { listingsArray } = product

            const generatedListings = listingsArray.map((listing) => {
                return {
                    ...listing,
                    product: createdProduct.id,
                }
            })

            const createdListings = await Listing.insertMany(generatedListings)

            createdProduct.listings = createdListings
            await createdProduct.save()
        }

        const storedListings = await Listing.find()

        const generatedUsers = users.map((user) => {
            return {
                ...user,
                cart: (() => {
                    const cartContent = []
                    for (let j = 0; j < getRandInt(1, 7); j++) {
                        cartContent.push(
                            storedListings[getRandInt(0, storedListings.length)]
                        )
                    }
                    return cartContent
                })(),
            }
        })

        const createdUsers = await User.insertMany(generatedUsers)
        createdUsers.map((cu) => userIDs.push(cu._id))

        for (let i = 0; i < getRandInt(10, 100); i++) {
            const order = {
                user: userIDs[getRandInt(0, userIDs.length)],
                products: (() => {
                    const orderProducts = []
                    for (let j = 0; j < getRandInt(1, 5); j++) {
                        orderProducts.push(
                            createdProducts[
                                getRandInt(0, createdProducts.length)
                            ]
                        )
                    }
                    return orderProducts
                })(),
                totalPrice: getRandInt(130000, 3000000),
                referral:
                    getRandInt(1, 100) % 2
                        ? createdUsers[getRandInt(0, createdUsers.length)][
                              'referral_code'
                          ]
                        : null,
            }
            orders.push(order)
        }

        const createdOrders = await Order.insertMany(orders)

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

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
