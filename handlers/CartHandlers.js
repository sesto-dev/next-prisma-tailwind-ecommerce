import Link from 'next/link'
import burnToast from '../helpers/burnToast'

export async function handleCartData({
    response,
    router,
    setCart,
    setToast,
    noDataToast,
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

    if (!data || !data.cart) {
        router.replace('/')
        burnToast(setToast, noDataToast)
    }

    setCart(data.cart)
}
