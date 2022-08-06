import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const decoded = await verifyRequest(req)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        res.status(200).json({ email: user.email, isVerified: user.isVerified })
    } else {
        res.status(401).send('Fail')
    }
}
