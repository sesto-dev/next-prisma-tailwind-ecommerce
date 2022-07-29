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
    popover: [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Account', link: '/account' },
        { name: 'Billing', link: '/billing' },
        { name: 'Pricing', link: '/pricing' },
    ],
    provider: {
        active: true,
        callbackUrl: url + `/api/auth/callback/google`,
        id: 'google',
        name: 'Google',
        signinUrl: url + `/api/auth/signin/google`,
        type: 'oauth',
    },
}

export default config
