import { signJWT } from './JWT'
import { serialize } from 'cookie'

export async function bakeAJWT(user, sameSite) {
    const token = await signJWT(user._id.toString())
    return serialize('AJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 30,
        sameSite,
        path: '/',
    })
}
