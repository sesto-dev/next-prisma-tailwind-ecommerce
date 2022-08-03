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

    let response

    try {
        response = await axios.post(
            config.backend.routes.login,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )
    } catch (error) {
        setLoading(false)
        burnToast(setToast, error.message)
    }

    if (response && response.status && response.status == 200) {
        burnToast(setToast, '✓ Login Successful')
        setAuthenticated(true)
        router.replace('/dashboard')
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

    let response

    try {
        response = await axios.post(
            config.backend.routes.register,
            {
                email: refEmail.current,
                password: refPassword.current,
            },
            config.backend.axios.simple
        )
    } catch (error) {
        setLoading(false)
        burnToast(setToast, error.message)
    }

    if (response && response.status && response.status == 200) {
        setAuthenticated(true)
        router.replace('/auth/verify')
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

    let response

    try {
        response = await axios.post(
            config.backend.routes.verify,
            {
                code: refCode.current,
            },
            config.backend.axios.simple
        )
    } catch (error) {
        setLoading(false)
        burnToast(setToast, error.message)
    }

    if (response && response.status && response.status == 200) {
        burnToast(setToast, '✓ Email Verification Successful')
        router.replace('/dashboard')
    }
}

export async function logoutHandler(
    config,
    setToast,
    setAuthenticated,
    router
) {
    const response = await axios.post(config.backend.routes.logout)

    if (response && response.status && response.status == 200) {
        setAuthenticated(false)
        router.replace('/')
        burnToast(setToast, '✓ Logout Successful')
    } else {
        burnToast(setToast, error.message)
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
        burnToast(setToast, error.message)
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
