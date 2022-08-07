import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'

import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        try {
            user.isSubscribed = false
            await user.save()

            res.status(200).json('Success!')
        } catch (error) {
            res.status(401).send('Please try again later!')
        }
    } else {
        res.status(401).send('Please try again later!')
    }
}
