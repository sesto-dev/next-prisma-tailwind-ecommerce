import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID,
            clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/new-user',
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = 'admin'
            return token
        },
    },
}

export default NextAuth(authOptions)
