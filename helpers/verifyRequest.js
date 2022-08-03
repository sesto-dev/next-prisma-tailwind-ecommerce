import { verifyJWT } from './JWT'

export default async function (req) {
    const { cookies } = req
    const jwt = cookies.AJWT

    return await verifyJWT(jwt)
}
