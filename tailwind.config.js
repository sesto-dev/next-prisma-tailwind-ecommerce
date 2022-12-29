/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
        './components/**/**/*.tsx',
        './layouts/**/*.tsx',
        './lib/gradient.ts',
        './lib/styles.ts',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Yekan', ...fontFamily.sans],
            },
            colors: {
                'blue-opaque': 'rgb(13 42 148 / 18%)',
                gray: {
                    0: '#fff',
                    100: '#fafafa',
                    200: '#eaeaea',
                    300: '#999999',
                    400: '#888888',
                    500: '#666666',
                    600: '#444444',
                    700: '#333333',
                    800: '#222222',
                    900: '#111111',
                },
            },
        },
    },
    variants: {
        typography: ['dark'],
    },
    plugins: [],
    corePlugins: {
        fontFamily: true,
    },
}
