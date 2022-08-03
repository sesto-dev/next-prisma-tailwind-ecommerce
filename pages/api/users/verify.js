import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'
import User from '../../../models/User'

export default async function (req, res) {
    const { code } = req.body

    if (!code) {
        res.status(401)
        throw new Error('Fail')
    }

    const decoded = await verifyRequest(req)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user && !user.isVerified) {
        if (code == user.verificationCode) {
            user.isVerified = true
            await user.save()

            res.status(200).json({ message: 'Success!' })
        } else {
            res.status(401)
            throw new Error('Wrong Verification Code!')
        }
    } else {
        res.status(401)
        throw new Error('Fail')
    }
}
