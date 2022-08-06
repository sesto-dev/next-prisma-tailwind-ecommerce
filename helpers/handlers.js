import axios from 'axios'
import burnToast from './burnToast'

export async function loginHandler(
    config,
    setLoading,
    setToast,
    setAuthenticated,
    router,
    refEmail,
    refPassword
) {
    setLoading(true)

    try {
        const response = await axios.post(
            config.backend.routes.login,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        if (response && response.status && response.status == 200) {
            burnToast(setToast, '✓ Login Successful')
            setAuthenticated(true)
            router.replace('/dashboard')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function registerHandler(
    config,
    setLoading,
    setToast,
    setAuthenticated,
    router,
    refEmail,
    refPassword
) {
    setLoading(true)

    try {
        const response = await axios.post(
            config.backend.routes.register,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        if (response && response.status && response.status == 200) {
            setAuthenticated(true)
            router.replace('/auth/verify')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function verifyHandler(
    config,
    setLoading,
    setToast,
    router,
    refCode
) {
    setLoading(true)

    try {
        const response = await axios.post(
            config.backend.routes.verify,
            {
                code: refCode.current,
            },
            config.backend.axios.simple
        )

        if (response && response.status && response.status == 200) {
            burnToast(setToast, '✓ Email Verification Successful')
            router.replace('/dashboard')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function logoutHandler(
    config,
    setToast,
    setAuthenticated,
    router
) {
    try {
        const response = await axios.post(config.backend.routes.logout)

        if (response && response.status && response.status == 200) {
            setAuthenticated(false)
            router.replace('/')
            burnToast(setToast, '✓ Logout Successful')
        }
    } catch (error) {
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function handleAccountData(
    response,
    router,
    setAccount,
    setToast
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
        burnToast(setToast, 'No data received.')
    }

    if (!data.isVerified) {
        router.replace('/auth/verify')
        burnToast(setToast, 'Please verify your email first.')
    }

    setAccount(data)
}

export async function unsubscribeHandler(config, setLoading, setToast) {
    setLoading(true)

    try {
        const response = await axios.post(config.backend.routes.unsubscribe)

        if (response && response.status && response.status == 200) {
            router.replace('/dashboard')
            burnToast(setToast, '✓ Successfully Unsubscribed...')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function subscribeHandler(config, setLoading, setToast) {
    setLoading(true)

    try {
        const response = await axios.post(config.backend.routes.subscribe)

        if (response && response.status && response.status == 200) {
            router.replace('/dashboard')
            burnToast(setToast, '✓ Successfully Subscribed...')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function forgotHandler(
    config,
    refEmail,
    setLoading,
    setToast,
    setNextStage
) {
    setLoading(true)

    try {
        const response = await axios.post(
            config.backend.routes.forgot,
            {
                email: refEmail.current,
            },
            config.backend.axios.simple
        )

        if (response && response.status && response.status == 200) {
            setLoading(false)
            setNextStage(true)
            burnToast(setToast, '✓ Successfully Requested Verification Code...')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}

export async function resetHandler(
    config,
    refCode,
    refPassword,
    setLoading,
    setToast,
    router
) {
    setLoading(true)

    try {
        const response = await axios.post(
            config.backend.routes.reset,
            {
                code: refCode.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )

        if (response && response.status && response.status == 200) {
            router.replace('/')
            burnToast(setToast, '✓ Successfully Reset Password...')
        }
    } catch (error) {
        setLoading(false)
        burnToast(
            setToast,
            error && error.response && error.response.data
                ? error.response.data
                : 'Error'
        )
    }
}
