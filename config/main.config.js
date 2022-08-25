const url = process.env.NEXT_PUBLIC_URL

export default {
    defaultLocale: 'en',
    theme: {
        width: '900pt',
        defaultTheme: 'dark',
        lightBackground: '#F0F0F0',
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
            user: '/api/users/user',
            login: '/api/users/login',
            logout: '/api/users/logout',
            register: '/api/users/register',
            verify: '/api/users/verify',
            unsubscribe: '/api/users/unsubscribe',
            subscribe: '/api/users/subscribe',
            forgot: '/api/users/forgot',
            reset: '/api/users/reset',
            products: '/api/products',
            order: '/api/orders',
            getCart: '/api/cart/get',
            addCart: '/api/cart/add',
            insertCart: '/api/cart/insert',
            subtractCart: '/api/cart/subtract',
            removeCart: '/api/cart/remove',
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
