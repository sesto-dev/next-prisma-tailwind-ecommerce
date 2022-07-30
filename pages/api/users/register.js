import connectDB from '../../../helpers/connectDB'
import { signJWT } from '../../../helpers/JWT'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'

export default async function Register(req, res) {
    await connectDB()
    const { email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const salted = await bcrypt.hash(password, salt)

    const user = await User.create({
        email,
        password: salted,
    })

    if (user) {
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
        throw new Error('Failed to create user.')
    }
}
