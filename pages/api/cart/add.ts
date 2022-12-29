import { gateUser } from 'lib/gateway'

export default async function (req, res) {
    const user = await gateUser(req, res)
}
