import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],
    session: {
        jwt: true,
    },
    jwt: {
        secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    callbacks: {
        async signIn(user, account, profile) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
                return false
            }
        },
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
              token.accessToken = account.accessToken
            }
            return token
        },
        async session(session, token) {
            session.accessToken = token.accessToken
            return session
        }
    },
    secret: process.env.JWT_SECRET,
    events: {},
    theme: 'light',
    debug: false,
});