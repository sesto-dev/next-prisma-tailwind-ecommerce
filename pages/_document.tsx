import GoogleAnalytics from 'components/GoogleAnalytics'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link href="/favicon.ico" rel="shortcut icon" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
                <GoogleAnalytics />
            </Head>
            <body className="bg-white text-black dark:bg-black dark:text-white">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
