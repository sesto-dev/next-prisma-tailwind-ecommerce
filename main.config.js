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
        title: 'Next',
        url,
    },
    tabs: [
        {
            label: 'ABOUT',
            value: '/about',
        },
        {
            label: 'PRICING',
            value: '/pricing',
        },
    ],
    links: {},
    footer: [
        [
            { label: 'Instagram', value: '/instagram' },
            { label: 'Medium', value: '/medium' },
        ],
        [
            { label: 'Blog', value: '/blog' },
            { label: 'Tutorials', value: '/tutorials' },
            { label: 'Documentation', value: '/documentation' },
            { label: 'Support', value: '/support' },
        ],
        [
            { label: 'About Us', value: '/about' },
            { label: 'Contact Us', value: '/contact' },
            { label: 'Terms of Service', value: '/terms' },
            { label: 'Privacy Policy', value: '/privacy' },
        ],
    ],
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
    ],
}

export default config
