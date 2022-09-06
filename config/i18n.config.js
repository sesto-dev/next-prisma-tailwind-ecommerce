const title = {
    en: 'Next',
    fa: 'نکست',
}

const meta = {
    title,
    description: {
        en: 'Small text as a description for the page.',
        fa: 'متن استفاده شده در صفحه مربوطه.',
    },
}

const inputs = {
    email: {
        label: {
            en: 'email',
            fa: 'ایمیل',
        },
        placeholder: {
            en: 'Input your email address.',
            fa: 'آدرس ایمیل خود را وارد کنید',
        },
        error: {
            en: 'Invalid email address.',
            fa: 'آدرس ایمیل معتبر نمی باشد',
        },
    },
    password: {
        label: {
            en: 'password',
            fa: 'رمز عبور',
        },
        placeholder: {
            en: 'Input your password.',
            fa: 'رمز عبور خود را وارد کنید',
        },
        error: {
            en: 'Password must be at least 8 characters.',
            fa: 'رمز عبور باید حداقل 8 حرف باشد',
        },
    },
    confirmPassword: {
        label: {
            en: 'password',
            fa: 'رمز عبور',
        },
        placeholder: {
            en: 'Confirm your password.',
            fa: 'رمز عبور را دوباره وارد کنید',
        },
        error: {
            en: 'Passwords do not match.',
            fa: 'رمز عبور ها یکسان نمی باشند',
        },
    },
    code: {
        label: {
            en: 'code',
            fa: 'کد تایید',
        },
        placeholder: {
            en: 'Input your verification code.',
            fa: 'کد تایید خود را وارد کنید',
        },
    },
}

const buttons = {
    login: {
        en: 'LOGIN',
        fa: 'ورود',
    },
    register: {
        en: 'REGISTER',
        fa: 'ثبت نام',
    },
    forgot: {
        en: 'Forgot your password?',
        fa: 'رمز خود را فراموش کرده اید؟',
    },
    submit: {
        en: 'SUBMIT',
        fa: 'ثبت',
    },
    google: {
        active: { en: 'Sign in with Google', fa: 'ورود با گوگل' },
        inactive: { en: 'Integrated with Google', fa: 'پیوند فعال با گوگل' },
    },
}

const toasts = {
    login: {
        en: '✓ Login Successful',
        fa: 'ورود موفقیت آمیز ✓',
    },
    logout: {
        en: '✓ Logout Successful',
        fa: 'خروج موفقیت آمیز ✓',
    },
    subscribe: {
        en: '✓ Subscribe Successful',
        fa: 'عضویت ایمیل موفقیت آمیز ✓',
    },
    unsubscribe: {
        en: '✓ Unsubscribe Successful',
        fa: 'حذف عضویت ایمیل موفقیت آمیز ✓',
    },
    verify: {
        en: '✓ Email Verification Successful',
        fa: 'تایید ایمیل موفقیت آمیز ✓',
    },
    forgot: {
        en: '✓ Successfully Requested Verification Code...',
        fa: 'درخواست کد تایید موفقیت آمیز ✓',
    },
    reset: {
        en: '✓ Successfully Reset Password...',
        fa: 'تغییر پسوورد موفقیت آمیز ✓',
    },
    addToCart: {
        en: 'Successfully added to cart.',
        fa: 'با موفقیت به سبد خرید اضافه شد.',
    },
    noData: {
        en: 'No data received',
        fa: 'اطلاعاتی دریافت نشد',
    },
    notVerified: {
        en: 'Your account is not verified.',
        fa: 'اکانت شما تایید نشده است',
    },
}

const components = {
    header: {
        submenu: {
            unprotected: [
                {
                    label: { en: 'Home', fa: 'خانه' },
                    value: '/',
                },
                {
                    label: {
                        en: 'Products',
                        fa: 'محصولات',
                    },
                    value: '/products',
                },
            ],
            protected: [
                {
                    label: { en: 'Cart', fa: 'سبد خرید' },
                    value: '/cart',
                },
                {
                    label: {
                        en: 'User',
                        fa: 'حساب کاربر',
                    },
                    value: '/user',
                },
            ],
        },
        title,
        modal: {
            login: {
                title: {
                    en: 'Login',
                    fa: 'ورود',
                },
                subtitle: {
                    en: 'with Email / Password',
                    fa: 'توسط ایمیل و پسوورد',
                },
            },
            register: {
                title: {
                    en: 'Register',
                    fa: 'ثبت نام',
                },
                subtitle: {
                    en: 'with Email / Password',
                    fa: 'توسط ایمیل و پسوورد',
                },
            },
        },
    },
    footer: {
        copyright: {
            en: 'Copyright © 2022 Next. All rights reserved.',
            fa: 'کلیه حقوق کپی رایت محفوظ است.',
        },
        title,
        links: [
            {
                en: 'Blog',
                fa: 'بلاگ',
                links: [
                    {
                        label: {
                            en: 'Blog',
                            fa: 'بلاگ',
                        },
                        value: '/blog',
                    },
                    {
                        label: {
                            en: 'Tutorials',
                            fa: 'آموزش ها',
                        },
                        value: '/tutorials',
                    },
                    {
                        label: {
                            en: 'Documentation',
                            fa: 'مستندات',
                        },
                        value: '/documentation',
                    },
                    {
                        label: {
                            en: 'Support',
                            fa: 'پشتیبانی',
                        },
                        value: '/support',
                    },
                ],
            },
            {
                en: 'Terms',
                fa: 'قوانین',
                links: [
                    {
                        label: {
                            en: 'Terms of Service',
                            fa: 'قوانین استفاده',
                        },
                        value: '/terms',
                    },
                    {
                        label: {
                            en: 'Privacy Policy',
                            fa: 'حریم شخصی',
                        },
                        value: '/privacy',
                    },
                ],
            },
            {
                en: 'About',
                fa: 'درباره',
                links: [
                    {
                        label: {
                            en: 'About',
                            fa: 'درباره ما',
                        },
                        value: '/about',
                    },
                    {
                        label: {
                            en: 'Contact',
                            fa: 'تماس',
                        },
                        value: '/contact',
                    },
                    {
                        label: {
                            en: 'Pricing',
                            fa: 'قیمت گذاری',
                        },
                        value: '/pricing',
                    },
                ],
            },
            {
                en: 'Social',
                fa: 'شبکه های اجتماعی',
                links: [
                    {
                        label: {
                            en: 'Instagram',
                            fa: 'اینستاگرام',
                        },
                        value: 'https://instagram.com/next',
                    },
                    {
                        label: {
                            en: 'YouTube',
                            fa: 'یوتیوب',
                        },
                        value: 'https://youtube.com/c/next',
                    },
                    {
                        label: {
                            en: 'Medium',
                            fa: 'مدیوم',
                        },
                        value: 'https://medium.com/@next',
                    },
                ],
            },
        ],
    },
}

const pages = {
    index: {
        title: {
            en: 'Index',
            fa: 'خانه',
        },
        description: {
            en: 'Index Page',
            fa: 'صفحه خانه',
        },
        content: {
            en: 'This page is designed to showcase the simplicity of the Layout component. Please visit the About page which displays a more substantial usecase.',
            fa: 'این صفحه برای نمایش سادگی استفاده از کامپوننت ها ساخته شده است.',
        },
    },
    cart: {
        title: {
            en: 'Cart',
            fa: 'سبد خرید',
        },
        description: {
            en: 'Cart Page',
            fa: 'صفحه سبد خرید',
        },
    },
    order: {
        title: {
            en: 'Order',
            fa: 'سفارش',
        },
        description: {
            en: 'Order Page',
            fa: 'صفحه سفارش',
        },
        info: {
            title: {
                en: 'Order Info',
                fa: 'اطلاعات سفارش',
            },
            description: {
                en: 'Detailed information about this order.',
                fa: 'جزییات دقیق در باره این سفارش',
            },
        },
        products: {
            title: {
                en: 'Order Products',
                fa: 'محصولات سفارش',
            },
            description: {
                en: 'List of products in this order.',
                fa: 'لیست محصولات سفارش داده شده در این سفارش',
            },
        },
    },
    product: {
        title: {
            en: 'Product',
            fa: 'محصول',
        },
        description: {
            en: 'Product Page',
            fa: 'صفحه محصول',
        },
    },
    products: {
        title: {
            en: 'Products',
            fa: 'محصولات',
        },
        description: {
            en: 'Products Page',
            fa: 'صفحه محصولات',
        },
        filter: {
            title: {
                en: 'Filter Products',
                fa: 'فیلتر محصولات',
            },
            subtitle: {
                en: 'Set of options to filter out products',
                fa: 'مجموعه گزینه ها برای فیلتر محصولات',
            },
        },
    },
    pricing: {
        title: {
            en: 'Pricing',
            fa: 'قیمت گذاری',
        },
        description: {
            en: 'Pricing Page',
            fa: 'صفحه قیمت گذاری',
        },
    },
    dashboard: {
        title: {
            en: 'Dashboard',
            fa: 'داشبورد',
        },
        description: {
            en: 'Dashboard Page',
            fa: 'صفحه داشبورد',
        },
    },
    user: {
        title: {
            en: 'User',
            fa: 'حساب کاربری',
        },
        description: {
            en: 'User Page',
            fa: 'صفحه حساب کاربری',
        },
        info: {
            title: {
                en: 'User Info',
                fa: 'اطلاعات کاربری',
            },
            description: {
                en: 'Basic information you have provided.',
                fa: 'اطلاعات کاربری',
            },
            name: {
                en: 'Name',
                fa: 'نام و نام خانوادگی',
            },
            email: {
                en: 'Email',
                fa: 'ایمیل',
            },
            referral: {
                en: 'Referral Code',
                fa: 'کد دعوت',
            },
        },
        orders: {
            title: {
                en: 'Orders',
                fa: 'سفارشات',
            },
            description: {
                en: 'Your order history.',
                fa: 'تاریخچه سفارشات شما',
            },
        },
        referrals: {
            title: {
                en: 'Referrals',
                fa: 'دعوت ها',
            },
            description: {
                en: 'Your referral history.',
                fa: 'تاریخچه دعوت های شما',
            },
        },
        integrations: {
            title: {
                en: 'Integrations',
                fa: 'پیوند ها',
            },
            description: {
                en: 'Your integrations with third-party services.',
                fa: 'پیوند های شما با سرویس های دیگر',
            },
        },
        logout: {
            title: {
                en: 'Logout',
                fa: 'خروج',
            },
            description: {
                en: 'Logout from your account',
                fa: 'از حساب کاربری خود خارج شوید.',
            },
        },
    },
    about: {
        title: {
            en: 'About',
            fa: 'درباره ما',
        },
        description: {
            en: 'This package provides a 1-Line script that sets in motion a barrage of tools and web-services to create a highly-customizable state-of-the-art Next.js PWA, like this one!',
            fa: 'این پکیج اسکریپتی 1 خطه را در اختیار قرار می دهد و  طوفانی از ابزار ها را به حرکت درآورده تا اپلیکیشن اینترنتی مدرنی را در اختیار کاربر بگذارد.',
        },
        content: {
            en: 'NPX is a tool intended to help round out the experience of using packages from the npm registry — the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.',
            fa: 'NPX ابزاری است که برای کمک به تکمیل تجربه استفاده از بسته‌ها از رجیستری npm در نظر گرفته شده است - همان طور که npm نصب و مدیریت وابستگی‌های میزبانی شده در رجیستری را بسیار آسان می‌کند، npx استفاده از ابزارهای CLI و سایر فایل‌های اجرایی میزبانی شده را آسان می‌کند. رجیستری این کار تعدادی از مواردی را که تا به حال نیاز به کمی تشریفات برای npm ساده داشت، بسیار ساده می کند.',
        },
    },
    contact: {
        title: {
            en: 'Contact',
            fa: 'تماس با ما',
        },
        description: {
            en: 'Way to get in contact.',
            fa: 'راه های تماس با ما',
        },
        content: {
            en: 'You can get in contact with us using this methods.',
            fa: 'برای تماس با ما می توانید از این راه ها استفاده کنید..',
        },
    },
    login: {
        title: {
            en: 'Login or Register',
            fa: 'ورود یا ثبت نام',
        },
        description: {
            en: 'Login or Register',
            fa: 'ورود یا ثبت نام',
        },
    },
    reset: {
        title: {
            en: 'Reset Password',
            fa: 'تغییر رمز عبور',
        },
        description: {
            en: 'Reset your password using the verification code sent to your email address.',
            fa: 'با استفاده از کد تایید ارسال شده به ایمیل شما، رمز عبور خود را تغییر دهید.',
        },
    },
    subscribe: {
        title: {
            en: 'Subscribe',
            fa: 'عضویت در لیست ایمیل',
        },
        description: {
            en: 'For security purposes, you should be logged-in in order to subscribe.',
            fa: 'به دلایل امنیتی، ابتدا نیاز به ورود به سایت دارید.',
        },
    },
    unsubscribe: {
        title: {
            en: 'Unsubscribe',
            fa: 'حذف از لبست ارسال ایمیل',
        },
        description: {
            en: 'For security purposes, you should be logged-in in order to unsubscribe.',
            fa: 'به دلایل امنیتی، ابتدا نیاز به ورود به سایت دارید.',
        },
    },
    verify: {
        title: {
            en: 'Verify Email Address',
            fa: 'تایید ایمیل',
        },
        description: {
            en: 'Verify your email address using the verification code sent to your email address.',
            fa: 'با استفاده از کد تایید ارسال شده به ایمیل، ایمیل خود را تایید کنید.',
        },
    },
}

export default {
    meta,
    inputs,
    buttons,
    toasts,
    components,
    pages,
}
