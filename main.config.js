const url = 'http://localhost:3000'

const config = {
    analytics: {
        googleAnalyticsID: null,
    },
    theme: {
        width: '900pt',
        defaultTheme: 'dark',
        lightBackground: '#F2F2F2',
        darkBackground: '#040404',
    },
    meta: {
        title: 'Next',
        url,
    },
    tabs: [
        {
            label: 'About',
            value: '/about',
        },
        {
            label: 'Pricing',
            value: '/pricing',
        },
        {
            label: 'Billing',
            value: '/billing',
        },
    ],
    links: {},
    urls: {
        contact: url + '/contact',
        verify: url + '/auth/verify',
        unsubscribe: url + '/auth/unsubscribe',
    },
    footer: {
        Blog: [
            { label: 'Blog', value: '/blog' },
            { label: 'Tutorials', value: '/tutorials' },
            { label: 'Documentation', value: '/documentation' },
            { label: 'Support', value: '/support' },
        ],
        Terms: [
            { label: 'Terms of Service', value: '/terms' },
            { label: 'Privacy Policy', value: '/privacy' },
        ],
        About: [
            { label: 'About Us', value: '/about' },
            { label: 'Contact Us', value: '/contact' },
            { label: 'Pricing', value: '/about' },
            { label: 'Billing', value: '/contact' },
        ],
        Community: [
            { label: 'Instagram', value: '/instagram' },
            { label: 'YouTube', value: '/youtube' },
            { label: 'Medium', value: '/medium' },
        ],
    },
    authentication: true,
    backend: {
        routes: {
            account: '/api/users/account',
            login: '/api/users/login',
            logout: '/api/users/logout',
            register: '/api/users/register',
            verify: '/api/users/verify',
        },
        axios: {
            simple: {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        },
    },
    popover: [{ label: 'Account', value: '/account' }],
}

export default config
