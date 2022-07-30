import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'

import { verifyJWT } from '../../../helpers/JWT'

export default async function Login(req, res) {
    await connectDB()

    const { cookies } = req
    const jwt = cookies.AJWT

    const decoded = await verifyJWT(jwt)

    const user = await User.findById(decoded.id)

    if (user) {
        res.status(200).json({ email: user.email })
    } else {
        res.status(401)
        throw new Error('Fail')
    }
}
