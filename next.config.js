/**
 * @type {import('next').NextConfig}
 */

const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
    dest: 'public',
    runtimeCaching,
})

module.exports = withPWA({
    pwa: {
        dest: 'public',
        scope: '/',
        runtimeCaching,
        disable: process.env.NODE_ENV === 'development',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/products',
                permanent: true,
            },
            {
                source: '/docs',
                destination: '/docs/welcome',
                permanent: true,
            },
        ]
    },
})
