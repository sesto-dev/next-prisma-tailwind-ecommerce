import connectDB from '../../../helpers/connectDB'
import { generateToken } from '../../../helpers/generateToken'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'

export default async function Login(req, res) {
    await connectDB()
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ email, token: await generateToken(user._id.toString()) })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}
