import 'styles/global.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Container from 'components/Container'
import { AuthProvider } from 'state/Auth'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
            >
                <Container>
                    <Component {...pageProps} />
                </Container>
            </ThemeProvider>
        </AuthProvider>
    )
}
