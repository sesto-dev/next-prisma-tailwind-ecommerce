const url = 'http://localhost:3000'

const config = {
    analytics: {
        googleAnalyticsID: null,
    },
    theme: {
        width: '900pt',
        defaultTheme: 'dark',
    },
    meta: {
        title: 'Next.js Dashboard',
        url,
    },
    tabs: [
        {
            label: 'ABOUT',
            value: '/about',
        },
    ],
    links: {},
    authentication: true,
    backend: {
        routes: {
            account: '/api/users/account',
            login: '/api/users/login',
            logout: '/api/users/logout',
            register: '/api/users/register',
        },
        axios: {
            simple: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        },
    },
    popover: [
        { label: 'Dashboard', value: '/dashboard' },
        { label: 'Account', value: '/account' },
        { label: 'Billing', value: '/billing' },
        { label: 'Pricing', value: '/pricing' },
    ],
}

export default config
