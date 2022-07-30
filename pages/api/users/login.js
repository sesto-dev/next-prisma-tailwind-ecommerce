import connectDB from '../../../helpers/connectDB'
import { signJWT } from '../../../helpers/JWT'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'

export default async function Login(req, res) {
    await connectDB()
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = await signJWT(user._id.toString())
        const serialised = serialize('AJWT', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        })
        res.setHeader('Set-Cookie', serialised)
        res.status(200).json({ message: 'Success!' })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
}
