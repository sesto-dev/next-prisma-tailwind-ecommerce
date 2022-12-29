import * as jose from 'jose'

const secret = process.env.JWT_SECRET

export async function signJWT(id) {
    return await new jose.SignJWT({ id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(new TextEncoder().encode(secret))
}

export async function getJWTPayload(jwt) {
    const { payload } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
    )

    return payload
}
