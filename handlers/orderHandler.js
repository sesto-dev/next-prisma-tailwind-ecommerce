import Link from 'next/link'
import burnToast from '../helpers/burnToast'

export async function handleOrderData({
    response,
    router,
    setOrder,
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

    if (!data) {
        router.replace('/')
        burnToast(setToast, noDataToast)
    }

    setOrder(data)
}
