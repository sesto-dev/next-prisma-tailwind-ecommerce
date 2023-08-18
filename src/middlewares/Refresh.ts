import { getAuthHeaderToken, verifyAndGetJWTPayload } from 'lib/jwt'
import { isVariableValid } from 'lib/utils'

const Refresh = (handler) => async (req, res) => {
    const token = getAuthHeaderToken({ req })

    if (!isVariableValid(token))
        return res.status(401).json({ error: 'Unauthorized' })

    const decoded = await verifyAndGetJWTPayload({
        token,
        secret: process.env.REFRESH_TOKEN_SECRET,
    })

    if (!isVariableValid(decoded))
        return res.status(401).json({ error: 'Invalid token' })

    return handler(req, res)
}

export default Refresh
