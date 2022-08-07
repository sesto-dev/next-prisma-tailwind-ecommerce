import { verifyJWT } from './JWT'

export default async function (req, res) {
    const { cookies } = req

    if (!cookies) res.status(400).send('Invalid request!')

    const jwt = cookies.AJWT

    if (!jwt) res.status(400).send('Invalid request!')

    return await verifyJWT(jwt)
}
