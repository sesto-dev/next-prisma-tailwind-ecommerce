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
        },
        axios: {
            login: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        },
    },
    popover: [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Account', link: '/account' },
        { name: 'Billing', link: '/billing' },
        { name: 'Pricing', link: '/pricing' },
    ],
}

export default config
