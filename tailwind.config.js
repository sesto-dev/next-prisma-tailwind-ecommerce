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
        './lib/*.ts',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Yekan', ...fontFamily.sans],
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
