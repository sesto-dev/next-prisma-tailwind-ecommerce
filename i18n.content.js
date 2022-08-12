const title = {
    en: 'Next',
    ja: '次',
    fa: 'نکست',
}

export default {
    meta: {
        title,
        description: {
            en: 'Small text as a description for the page.',
            ja: 'ページの説明としての小さなテキスト。',
            fa: 'متن نمونه استفاده شده در صفحه مربوطه.',
        },
    },
    inputs: {
        email: {
            label: {
                en: 'email',
                ja: '電子メイル',
                fa: 'ایمیل',
            },
            placeholder: {
                en: 'Input your email address.',
                ja: 'メールアドレスを入力してください。',
                fa: 'آدرس ایمیل خود را وارد کنید',
            },
            error: {
                en: 'Invalid email address.',
                ja: 'メールアドレスを入力してください。',
                fa: 'آدرس ایمیل معتبر نمی باشد',
            },
        },
        password: {
            label: {
                en: 'password',
                ja: 'パスワード',
                fa: 'رمز عبور',
            },
            placeholder: {
                en: 'Input your password.',
                ja: 'パスワードを入力してください。',
                fa: 'رمز عبور خود را وارد کنید',
            },
            error: {
                en: 'Password must be at least 8 characters.',
                ja: '',
                fa: 'رمز عبور باید حداقل 8 حرف باشد',
            },
        },
        confirmPassword: {
            label: {
                en: 'password',
                ja: 'パスワード',
                fa: 'رمز عبور',
            },
            placeholder: {
                en: 'Confirm your password.',
                ja: 'あなたのパスワードを確認。',
                fa: 'رمز عبور را دوباره وارد کنید',
            },
            error: {
                en: 'Passwords do not match.',
                ja: '',
                fa: 'رمز عبور ها یکسان نمی باشند',
            },
        },
        code: {
            label: {
                en: 'code',
                ja: 'パスワード',
                fa: 'کد تایید',
            },
            placeholder: {
                en: 'Input your verification code.',
                ja: 'あなたのパスワードを確認。',
                fa: 'کد تایید خود را وارد کنید',
            },
        },
    },
    buttons: {
        login: {
            en: 'Login',
            ja: 'ログインする',
            fa: 'ورود',
        },
        register: {
            en: 'Register',
            ja: '登録',
            fa: 'ثبت نام',
        },
        forgot: {
            en: 'Forgot your password?',
            ja: 'パスワードをお忘れですか？',
            fa: 'رمز خود را فراموش کرده اید؟',
        },
        submit: {
            en: 'Submit',
            ja: '登録',
            fa: 'ثبت',
        },
    },
    components: {
        header: {
            submenu: {
                home: {
                    en: 'Home',
                    ja: '表題',
                    fa: 'خانه',
                },
                tabs: [
                    {
                        label: {
                            en: 'About',
                            ja: '約',
                            fa: 'درباره ما',
                        },
                        value: '/about',
                    },
                    {
                        label: {
                            en: 'Pricing',
                            ja: '価格',
                            fa: 'قیمت گذاری',
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
                    fa: 'حساب کاربری',
                },
                logout: {
                    en: 'Logout',
                    ja: 'ログアウト',
                    fa: 'خروج',
                },
                links: [
                    {
                        label: {
                            en: 'Account',
                            ja: 'アカウント',
                            fa: 'حساب کاربری',
                        },
                        value: '/account',
                    },
                    {
                        label: {
                            en: 'Dashboard',
                            ja: '前板',
                            fa: 'داشبورد',
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
                fa: 'کلیه حقوق کپی رایت محفوظ است.',
            },
            title,
            links: [
                {
                    en: 'Blog',
                    ja: 'ブログ',
                    fa: 'بلاگ',
                    links: [
                        {
                            label: {
                                en: 'Blog',
                                ja: 'ブログ',
                                fa: 'بلاگ',
                            },
                            value: '/blog',
                        },
                        {
                            label: {
                                en: 'Tutorials',
                                ja: 'チュートリアル',
                                fa: 'آموزش ها',
                            },
                            value: '/tutorials',
                        },
                        {
                            label: {
                                en: 'Documentation',
                                ja: 'ドキュメンテーション',
                                fa: 'مستندات',
                            },
                            value: '/documentation',
                        },
                        {
                            label: {
                                en: 'Support',
                                ja: 'サポート',
                                fa: 'پشتیبانی',
                            },
                            value: '/support',
                        },
                    ],
                },
                {
                    en: 'Terms',
                    ja: '条項',
                    fa: 'قوانین',
                    links: [
                        {
                            label: {
                                en: 'Terms of Service',
                                ja: '利用規約',
                                fa: 'قوانین استفاده',
                            },
                            value: '/terms',
                        },
                        {
                            label: {
                                en: 'Privacy Policy',
                                ja: 'プライバシーポリシー',
                                fa: 'حریم شخصی',
                            },
                            value: '/privacy',
                        },
                    ],
                },
                {
                    en: 'About',
                    ja: '約',
                    fa: 'درباره',
                    links: [
                        {
                            label: {
                                en: 'About',
                                ja: '約',
                                fa: 'درباره ما',
                            },
                            value: '/about',
                        },
                        {
                            label: {
                                en: 'Contact',
                                ja: 'コンタクト',
                                fa: 'تماس',
                            },
                            value: '/contact',
                        },
                        {
                            label: {
                                en: 'Pricing',
                                ja: '価格',
                                fa: 'قیمت گذاری',
                            },
                            value: '/pricing',
                        },
                    ],
                },
                {
                    en: 'Social',
                    ja: '社交',
                    fa: 'شبکه های اجتماعی',
                    links: [
                        {
                            label: {
                                en: 'Instagram',
                                ja: 'インスタグラム',
                                fa: 'اینستاگرام',
                            },
                            value: '/instagram',
                        },
                        {
                            label: {
                                en: 'YouTube',
                                ja: 'ユーチューブ',
                                fa: 'یوتیوب',
                            },
                            value: '/youtube',
                        },
                        {
                            label: {
                                en: 'Medium',
                                ja: '中くらい',
                                fa: 'مدیوم',
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
                fa: 'تغییر رمز عبور',
            },
            description: {
                en: 'Reset your password using the verification code sent to your email address.',
                ja: 'メールアドレスに送信された確認コードを使用してパスワードをリセットしてください。',
                fa: 'با استفاده از کد تایید ارسال شده به ایمیل شما، رمز عبور خود را تغییر دهید.',
            },
        },
        subscribe: {
            title: {
                en: 'Subscribe',
                ja: '申し込む',
                fa: 'عضویت در لیست ایمیل',
            },
            description: {
                en: 'For security purposes, you should be logged-in in order to subscribe.',
                ja: 'セキュリティ上の理由から、購読するにはログインする必要があります。',
                fa: 'به دلایل امنیتی، ابتدا نیاز به ورود به سایت دارید.',
            },
        },
        unsubscribe: {
            title: {
                en: 'Unsubscribe',
                ja: '登録解除',
                fa: 'حذف از لبست ارسال ایمیل',
            },
            description: {
                en: 'For security purposes, you should be logged-in in order to unsubscribe.',
                ja: 'セキュリティ上の理由から、登録を解除するにはログインする必要があります。',
                fa: 'به دلایل امنیتی، ابتدا نیاز به ورود به سایت دارید.',
            },
        },
        verify: {
            title: {
                en: 'Verify Email Address',
                ja: 'メールアドレスの確認',
                fa: 'تایید ایمیل',
            },
            description: {
                en: 'Verify your email address using the verification code sent to your email address.',
                ja: 'メール アドレスに送信された確認コードを使用して、メール アドレスを確認します。',
                fa: 'با استفاده از کد تایید ارسال شده به ایمیل، ایمیل خود را تایید کنید.',
            },
        },
    },
    root: {
        index: {
            title: {
                en: 'Index',
                ja: '表題',
                fa: 'خانه',
            },
            description: {
                en: 'Index Sample Page',
                ja: 'インデックス サンプル ページ',
                fa: 'صفحه نمونه خانه',
            },
            content: {
                en: 'This page is designed to showcase the simplicity of the Layout component. Please visit the About page which displays a more substantial usecase.',
                ja: 'このページは、レイアウトコンポーネントのシンプルさを紹介するために設計されています。より充実したユースケースを表示するページについてをご覧ください。',
                fa: 'این صفحه برای نمایش سادگی استفاده از کامپوننت ها ساخته شده است.',
            },
        },
        pricing: {
            title: {
                en: 'Pricing',
                ja: '価格',
                fa: 'قیمت گذاری',
            },
            description: {
                en: 'Pricing Sample Page',
                ja: '料金サンプルページ',
                fa: 'صفحه نمونه قیمت گذاری',
            },
        },
        dashboard: {
            title: {
                en: 'Dashboard',
                ja: '前板',
                fa: 'داشبورد',
            },
            description: {
                en: 'Dashboard Sample Page',
                ja: 'ダッシュボードのサンプル ページ',
                fa: 'صفحه نمونه داشبورد',
            },
        },
        account: {
            title: {
                en: 'Account',
                ja: '口座',
                fa: 'حساب کاربری',
            },
            description: {
                en: 'Account Sample Page',
                ja: 'アカウントのサンプルページ',
                fa: 'صفحه نمونه حساب کاربری',
            },
        },
        about: {
            title: {
                en: 'About',
                ja: '約',
                fa: 'درباره ما',
            },
            description: {
                en: 'This package provides a 1-Line script that sets in motion a barrage of tools and web-services to create a highly-customizable state-of-the-art Next.js PWA, like this one!',
                ja: 'このパッケージは、このような高度にカスタマイズ可能な最先端の Next.js PWA を作成するための一連のツールと Web サービスを起動する 1 行のスクリプトを提供します!',
                fa: 'این پکیج اسکریپتی 1 خطه را در اختیار قرار می دهد و  طوفانی از ابزار ها را به حرکت درآورده تا اپلیکیشن اینترنتی مدرنی را در اختیار کاربر بگذارد.',
            },
            content: {
                en: 'NPX is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.',
                ja: 'NPX は、npm レジストリからパッケージを使用するエクスペリエンスを完成させるためのツールです。npm を使用すると、レジストリでホストされている依存関係のインストールと管理が非常に簡単になります。npx を使用すると、レジストリでホストされている CLI ツールやその他の実行可能ファイルを簡単に使用できます。 レジストリ。 これまでは、単純な npm を使用するために多少の儀式が必要だった多くのことが大幅に簡素化されます。',
                fa: 'NPX ابزاری است که برای کمک به تکمیل تجربه استفاده از بسته‌ها از رجیستری npm در نظر گرفته شده است - همان طور که npm نصب و مدیریت وابستگی‌های میزبانی شده در رجیستری را بسیار آسان می‌کند، npx استفاده از ابزارهای CLI و سایر فایل‌های اجرایی میزبانی شده را آسان می‌کند. رجیستری این کار تعدادی از مواردی را که تا به حال نیاز به کمی تشریفات برای npm ساده داشت، بسیار ساده می کند.',
            },
        },
        contact: {
            title: {
                en: 'Contact',
                ja: '約',
                fa: 'تماس با ما',
            },
            description: {
                en: 'Way to get in contact.',
                ja: '',
                fa: 'راه های تماس با ما',
            },
            content: {
                en: 'You can get in contact with us using this methods.',
                ja: '',
                fa: 'برای تماس با ما می توانید از این راه ها استفاده کنید..',
            },
        },
    },
}
