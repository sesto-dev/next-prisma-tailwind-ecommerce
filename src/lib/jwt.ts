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

export function getAuthHeaderToken({ req }) {
    return req.headers['authorization'].split(' ')[1]
}

export async function IdentifyAccess({ req, secret }) {
    return await verifyAndGetJWTPayload({
        token: getAuthHeaderToken({ req }),
        secret,
    })
}
