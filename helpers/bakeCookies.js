import { signJWT } from './JWT'
import { serialize } from 'cookie'

export async function bakeAJWT(user) {
    const token = await signJWT(user._id.toString())
    return serialize('AJWT', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
}

export async function bakeAUTH() {
    return serialize('AUTH', 'true', {
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
    })
}
