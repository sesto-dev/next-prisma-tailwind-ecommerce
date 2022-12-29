import { signJWT } from 'lib/jwt'
import { serialize } from 'cookie'

export default async function bakeCookie({ id, sameSite }) {
    return serialize('AJWT', await signJWT(id), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 30,
        sameSite,
        path: '/',
    })
}
