import connectDB from '../../../helpers/connectDB'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import bakeCookie from '../../../helpers/bakeCookie'

export default async function (req, res) {
    connectDB()

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const serialized = await bakeCookie(user)

        res.setHeader('Set-Cookie', serialized)
        res.status(200)
    } else {
        res.status(401).send('Invalid email or password')
    }
}
