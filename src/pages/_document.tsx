import GoogleAnalytics from 'components/GoogleAnalytics'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/manifest.json" rel="manifest" />
                <link href="/favicon.ico" rel="shortcut icon" />
                <link href="/ios.png" rel="apple-touch-icon" />
                <meta content="#0C0C0C" name="theme-color" />
                <meta content="#0C0C0C" name="msapplication-TileColor" />
                <GoogleAnalytics />
            </Head>
            <body className="bg-white text-black dark:bg-black dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
