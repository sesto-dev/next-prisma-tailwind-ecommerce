import Document, { Html, Head, Main, NextScript } from 'next/document'
import { CssBaseline } from '@geist-ui/core'
import config from '../main.config'

const isProduction = process.env.NODE_ENV === 'production'
const googleID = config.analytics.googleAnalyticsID

const gtag = `https://www.googletagmanager.com/gtag/js?id=${googleID}`
const gscript = {
    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleID}', {
                  page_path: window.location.pathname,
                });
              `,
}

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        const styles = CssBaseline.flush()

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {styles}
                </>
            ),
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    {googleID && isProduction && (
                        <>
                            <script async src={gtag} />
                            <script dangerouslySetInnerHTML={gscript} />
                        </>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
