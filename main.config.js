const url = process.env.NEXT_PUBLIC_URL

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
    layout: {
        authentication: true,
    },
    meta: {
        title: 'Next',
        url,
    },
    submenu: [
        {
            label: {
                en: 'About',
                ja: '約',
            },
            value: '/about',
        },
        {
            label: {
                en: 'Pricing',
                ja: '価格',
            },
            value: '/pricing',
        },
    ],
    urls: {
        contact: url + '/contact',
        verify: url + '/auth/verify',
        reset: url + '/auth/reset',
        unsubscribe: url + '/auth/unsubscribe',
    },
    footer: {
        Blog: [
            {
                label: {
                    en: 'Blog',
                    ja: 'ブログ',
                },
                value: '/blog',
            },
            {
                label: {
                    en: 'Tutorials',
                    ja: 'チュートリアル',
                },
                value: '/tutorials',
            },
            {
                label: {
                    en: 'Documentation',
                    ja: 'ドキュメンテーション',
                },
                value: '/documentation',
            },
            {
                label: {
                    en: 'Support',
                    ja: 'サポート',
                },
                value: '/support',
            },
        ],
        Terms: [
            {
                label: {
                    en: 'Terms of Service',
                    ja: '利用規約',
                },
                value: '/terms',
            },
            {
                label: {
                    en: 'Privacy Policy',
                    ja: 'プライバシーポリシー',
                },
                value: '/privacy',
            },
        ],
        About: [
            {
                label: {
                    en: 'About',
                    ja: '約',
                },
                value: '/about',
            },
            {
                label: {
                    en: 'Contact',
                    ja: 'コンタクト',
                },
                value: '/contact',
            },
            {
                label: {
                    en: 'Pricing',
                    ja: '価格',
                },
                value: '/pricing',
            },
        ],
        Social: [
            {
                label: {
                    en: 'Instagram',
                    ja: 'インスタグラム',
                },
                value: '/instagram',
            },
            {
                label: {
                    en: 'YouTube',
                    ja: 'ユーチューブ',
                },
                value: '/youtube',
            },
            {
                label: {
                    en: 'Medium',
                    ja: '中くらい',
                },
                value: '/medium',
            },
        ],
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
    popover: [{ label: 'Account', value: '/account' }],
}

export default config
