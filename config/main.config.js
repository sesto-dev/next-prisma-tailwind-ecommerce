const url = process.env.NEXT_PUBLIC_URL

export default {
    defaultLocale: 'en',
    theme: {
        width: '950pt',
        defaultTheme: 'dark',
        lightBackground: '#F0F0F0',
        darkBackground: '#040404',
    },
    layout: {
        authentication: true,
    },
    meta: {
        title: 'Sample Meta Title',
        description: 'Sample Meta Description',
        image: 'https://i.imgur.com/NitQE9d.jpg',
        url,
    },
    routes: {
        frontend: {
            root: '/',
            user: '/user',
            verify: '/auth/verify',
            login: '/auth/login',
            contact: '/contact',
            reset: '/auth/reset',
            subscribe: '/auth/subscribe',
            unsubscribe: '/auth/unsubscribe',
        },
        backend: {
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
    },
    axios: {
        simple: {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    },
}
