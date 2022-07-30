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
    backend: {
        routes: {
            login: process.env.NEXT_PUBLIC_API_URL + '/users/login',
            register: process.env.NEXT_PUBLIC_API_URL + '/users/register',
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
