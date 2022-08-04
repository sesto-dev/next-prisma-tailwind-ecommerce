import { signJWT } from './JWT'
import { serialize } from 'cookie'

export default async function (user) {
    const token = await signJWT(user._id.toString())
    return serialize('AJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
}
