import { format } from 'date-fns'
import { enUS, faIR } from 'date-fns/locale'

import connectDB from '../../../helpers/connectDB'
import verifyRequest from '../../../helpers/verifyRequest'

import User from '../../../models/User'
import Order from '../../../models/Order'

export default async function (req, res) {
    const decoded = await verifyRequest(req, res)

    connectDB()

    const user = await User.findById(decoded.id)

    if (user) {
        let ordersObject = await Order.find({ user: user._id })
        const orders = Object.keys(ordersObject).map((key) => ({
            index: String(Number(key) + 1),
            id: ordersObject[key]['_id'],
            referral: ordersObject[key]['referral'],
            isPaid: ordersObject[key]['isPaid'] ? 'YES' : 'NO',
            isDelivered: ordersObject[key]['isDelivered'] ? 'YES' : 'NO',
            totalPrice: String(ordersObject[key]['totalPrice']),
            createdAt: format(
                new Date(ordersObject[key]['createdAt']),
                'PPPP',
                { locale: enUS }
            ),
        }))

        let referralsObject = await Order.find({ referral: user.referral_code })
        const referrals = Object.keys(referralsObject).map((key) => ({
            index: String(Number(key) + 1),
            id: referralsObject[key]['_id'],
            totalPrice: String(referralsObject[key]['totalPrice']),
            createdAt: format(
                new Date(referralsObject[key]['createdAt']),
                'PPPP',
                { locale: enUS }
            ),
        }))

        const {
            name,
            email,
            cart,
            credit,
            phone,
            referral_code,
            isEmailVerified,
            isPhoneVerified,
            integrations,
        } = user

        res.status(200).json({
            name,
            email,
            cart,
            credit,
            phone,
            referral_code,
            isEmailVerified,
            isPhoneVerified,
            integrations,
            orders,
            referrals,
        })
    } else {
        res.status(401).send('Fail')
    }
}
