import * as jose from 'jose'

export async function generateToken(id) {
    return await new jose.SignJWT({ id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET))
}
