import bcrypt from 'bcryptjs'

import connectDB from '../../../helpers/connectDB'
import bakeCookie from '../../../helpers/bakeCookie'

import User from '../../../models/User'

export default async function (req, res) {
    connectDB()

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const serialized = await bakeCookie(user)

        res.setHeader('Set-Cookie', serialized)
        res.status(200).json('Success!')
    } else {
        res.status(401).send('Invalid email or password')
    }
}
