const title = {
    en: 'Next',
    ja: '次',
}

export default {
    meta: {
        title,
        description: {
            en: 'Small text as a description for the page.',
            ja: 'ページの説明としての小さなテキスト。',
        },
    },
    components: {
        header: {
            login: {
                login: {
                    en: 'Login',
                    ja: 'ログインする',
                },
                register: {
                    en: 'Register',
                    ja: '登録',
                },
                forgot: {
                    en: 'Forgot your password?',
                    ja: 'パスワードをお忘れですか？',
                },
            },
            submenu: {
                home: {
                    en: 'Home',
                    ja: '表題',
                },
                tabs: [
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
            },
            title,
            account: {
                text: {
                    en: 'ACCOUNT',
                    ja: 'アカウント',
                },
                logout: {
                    en: 'Logout',
                    ja: 'ログアウト',
                },
                links: [
                    {
                        label: {
                            en: 'Account',
                            ja: 'アカウント',
                        },
                        value: '/account',
                    },
                    {
                        label: {
                            en: 'Dashboard',
                            ja: '前板',
                        },
                        value: '/dashboard',
                    },
                ],
            },
        },
        footer: {
            copyright: {
                en: 'Copyright © 2022 Next. All rights reserved.',
                ja: '著作権 © 2022 Next. 全著作権所有.',
            },
            title,
            links: [
                {
                    en: 'Blog',
                    ja: 'ブログ',
                    links: [
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
                },
                {
                    en: 'Terms',
                    ja: '条項',
                    links: [
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
                },
                {
                    en: 'About',
                    ja: '約',
                    links: [
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
                },
                {
                    en: 'Social',
                    ja: '社交',
                    links: [
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
            ],
        },
    },
    auth: {
        reset: {
            title: {
                en: 'Reset Password',
                ja: 'パスワードを再設定する',
            },
            description: {
                en: 'Reset your password using the verification code sent to your email address.',
                ja: 'メールアドレスに送信された確認コードを使用してパスワードをリセットしてください。',
            },
        },
        subscribe: {
            title: {
                en: 'Subscribe',
                ja: '申し込む',
            },
            description: {
                en: 'For security purposes, you should be logged-in in order to subscribe.',
                ja: 'セキュリティ上の理由から、購読するにはログインする必要があります。',
            },
        },
        unsubscribe: {
            title: {
                en: 'Unsubscribe',
                ja: '登録解除',
            },
            description: {
                en: 'For security purposes, you should be logged-in in order to unsubscribe.',
                ja: 'セキュリティ上の理由から、登録を解除するにはログインする必要があります。',
            },
        },
        verify: {
            title: {
                en: 'Verify Email Address',
                ja: 'メールアドレスの確認',
            },
            description: {
                en: 'Verify your email address using the verification code sent to your email address.',
                ja: 'メール アドレスに送信された確認コードを使用して、メール アドレスを確認します。',
            },
        },
    },
    root: {
        index: {
            title: {
                en: 'Index',
                ja: '表題',
            },
            description: {
                en: 'Index Sample Page',
                ja: 'インデックス サンプル ページ',
            },
            content: {
                en: 'This page is designed to showcase the simplicity of the Layout component. Please visit the About page which displays a more substantial usecase.',
                ja: 'このページは、レイアウトコンポーネントのシンプルさを紹介するために設計されています。より充実したユースケースを表示するページについてをご覧ください。',
            },
        },
        pricing: {
            title: {
                en: 'Pricing',
                ja: '価格',
            },
            description: {
                en: 'Pricing Sample Page',
                ja: '料金サンプルページ',
            },
        },
        dashboard: {
            title: {
                en: 'Dashboard',
                ja: '前板',
            },
            description: {
                en: 'Dashboard Sample Page',
                ja: 'ダッシュボードのサンプル ページ',
            },
        },
        account: {
            title: {
                en: 'Account',
                ja: '口座',
            },
            description: {
                en: 'Account Sample Page',
                ja: 'アカウントのサンプルページ',
            },
        },
        about: {
            title: {
                en: 'About',
                ja: '約',
            },
            description: {
                en: 'This package provides a 1-Line script that sets in motion a barrage of tools and web-services to create a highly-customizable state-of-the-art Next.js PWA, like this one!',
                ja: 'このパッケージは、このような高度にカスタマイズ可能な最先端の Next.js PWA を作成するための一連のツールと Web サービスを起動する 1 行のスクリプトを提供します!',
            },
            content: {
                en: 'NPX is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.',
                ja: 'NPX は、npm レジストリからパッケージを使用するエクスペリエンスを完成させるためのツールです。npm を使用すると、レジストリでホストされている依存関係のインストールと管理が非常に簡単になります。npx を使用すると、レジストリでホストされている CLI ツールやその他の実行可能ファイルを簡単に使用できます。 レジストリ。 これまでは、単純な npm を使用するために多少の儀式が必要だった多くのことが大幅に簡素化されます。',
            },
        },
    },
}
