import '../styles/global.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Container from '@/components/native/Container'
import { UserContextProvider } from '@/state/User'
import { CartContextProvider } from '@/state/Cart'

export default function App({ Component, pageProps }: AppProps) {
   return (
      <UserContextProvider>
         <CartContextProvider>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               disableTransitionOnChange
            >
               <Container>
                  <Component {...pageProps} />
               </Container>
            </ThemeProvider>
         </CartContextProvider>
      </UserContextProvider>
   )
}
