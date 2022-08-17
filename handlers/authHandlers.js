import axios from 'axios'
import burnToast from '../helpers/burnToast'

export async function loginHandler({
    config,
    setLoading,
    setToast,
    setLocalAuthentication,
    router,
    refEmail,
    refPassword,
    toast,
}) {
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
            burnToast(setToast, toast)
            setLocalAuthentication(true)
            router.replace('/user')
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

export async function registerHandler({
    config,
    setLoading,
    setToast,
    setLocalAuthentication,
    router,
    refEmail,
    refPassword,
}) {
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
            setLocalAuthentication(true)
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
    refCode,
    toast
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
            burnToast(setToast, toast)
            router.replace('/user')
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

export async function logoutHandler({
    config,
    setToast,
    setLocalAuthentication,
    router,
    toast,
}) {
    try {
        const response = await axios.post(config.backend.routes.logout)

        if (response && response.status && response.status == 200) {
            setLocalAuthentication(false)
            router.replace('/')
            burnToast(setToast, toast)
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

export async function unsubscribeHandler(config, setLoading, setToast, toast) {
    setLoading(true)

    try {
        const response = await axios.post(config.backend.routes.unsubscribe)

        if (response && response.status && response.status == 200) {
            router.replace('/user')
            burnToast(setToast, toast)
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

export async function subscribeHandler(config, setLoading, setToast, toast) {
    setLoading(true)

    try {
        const response = await axios.post(config.backend.routes.subscribe)

        if (response && response.status && response.status == 200) {
            router.replace('/user')
            burnToast(setToast, toast)
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
    setNextStage,
    toast
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
            burnToast(setToast, toast)
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
    router,
    toast
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
            burnToast(setToast, toast)
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
