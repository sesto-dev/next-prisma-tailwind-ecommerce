import burnToast from '../helpers/burnToast'

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

    if (!data.isVerified) {
        router.replace('/auth/verify')
        burnToast(setToast, notVerifiedToast)
    }

    setUser(data)
}
