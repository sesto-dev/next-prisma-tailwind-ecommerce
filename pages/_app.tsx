import 'styles/global.css'

import { ThemeProvider } from 'next-themes'
import Container from 'components/Container'
import { AuthProvider } from 'state/Auth'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <AuthProvider>
            <ThemeProvider attribute="class">
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ThemeProvider>
        </AuthProvider>
    )
}
