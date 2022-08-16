module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/products',
                permanent: true,
            },
        ]
    },
    i18n: {
        locales: ['en', 'fa'],
        defaultLocale: 'en',
    },
}
