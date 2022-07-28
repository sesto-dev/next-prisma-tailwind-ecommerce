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
    },
    tabs: [
        {
            label: 'ABOUT',
            value: '/about',
        },
    ],
    links: {},
    provider: {
        active: true,
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/callback/google`,
        id: 'google',
        name: 'Google',
        signinUrl: `${process.env.NEXT_PUBLIC_URL}/api/auth/signin/google`,
        type: 'oauth',
    },
}

export default config
