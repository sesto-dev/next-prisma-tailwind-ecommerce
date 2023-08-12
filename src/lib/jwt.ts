import jwt from 'jsonwebtoken'

export async function signJWT({ id, secret, expiresIn }) {
    return jwt.sign(
        {
            id,
        },
        secret,
        { expiresIn }
    )
}

export async function verifyAndGetJWTPayload({ token, secret }) {
    return jwt.verify(token, secret)
}

export async function IdentifyRequest({ req }) {
    const authHeader = req.headers['authorization']

    const token =
        authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null

    return await verifyAndGetJWTPayload({
        token,
        secret: process.env.ACCESS_TOKEN_SECRET,
    })
}
