import axios from 'axios'
import burnToast from '../burnToast'

export async function handleAccountData(
    response,
    router,
    setAccount,
    setToast,
    noDataToast,
    notVerifiedToast
) {
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

    if (!data.isVerified) {
        router.replace('/auth/verify')
        burnToast(setToast, notVerifiedToast)
    }

    setAccount(data)
}
