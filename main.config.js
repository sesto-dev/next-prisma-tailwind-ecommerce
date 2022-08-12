const url = process.env.NEXT_PUBLIC_URL

export default {
    analytics: {
        googleAnalyticsID: null,
    },
    theme: {
        width: '900pt',
        defaultTheme: 'dark',
        lightBackground: '#F5F5F5',
        darkBackground: '#040404',
    },
    layout: {
        authentication: true,
    },
    meta: {
        title: 'Next',
        url,
    },
    urls: {
        contact: url + '/contact',
        verify: url + '/auth/verify',
        reset: url + '/auth/reset',
        unsubscribe: url + '/auth/unsubscribe',
    },
    backend: {
        routes: {
            account: '/api/users/account',
            login: '/api/users/login',
            logout: '/api/users/logout',
            register: '/api/users/register',
            verify: '/api/users/verify',
            unsubscribe: '/api/users/unsubscribe',
            subscribe: '/api/users/subscribe',
            forgot: '/api/users/forgot',
            reset: '/api/users/reset',
        },
        axios: {
            simple: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        },
    },
}
