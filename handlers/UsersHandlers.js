import Link from 'next/link'
import burnToast from '../helpers/burnToast'
import { Link as LinkIcon } from '@geist-ui/icons'

export async function handleUserData({
    response,
    router,
    setUser,
    setToast,
    noDataToast,
    notVerifiedToast,
}) {
    const { data, error } = response

    if (error) {
        router.replace('/')
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }

    if (!data) {
        router.replace('/')
        burnToast(setToast, noDataToast)
    }

    if (!data.isEmailVerified) {
        router.replace('/auth/verify')
        burnToast(setToast, notVerifiedToast)
    }

    const orders = data.orders
    const pOrders = orders.map((order) => {
        return {
            ...order,
            link: (
                <Link href={`/order/${order.id}`}>
                    <a>
                        {`Order #${order.index}`} {'  '} <LinkIcon size={12} />
                    </a>
                </Link>
            ),
        }
    })

    data.orders = pOrders

    setUser(data)
}
