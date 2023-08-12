import { verifyAndGetJWTPayload } from 'lib/jwt'

const Auth = (handler) => async (req, res) => {
    const authHeader = req.headers['authorization']

    const token =
        authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null

    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const decodedToken = await verifyAndGetJWTPayload({
        token,
        secret: process.env.ACCESS_TOKEN_SECRET,
    })

    if (!decodedToken) return res.status(401).json({ error: 'Invalid token' })

    return handler(req, res)
}

export default Auth
