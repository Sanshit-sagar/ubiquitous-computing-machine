import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
    },
    callbacks: {
        async signIn(user, account, profile) {
          return true
        },
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl) ? url: baseUrl
        },
        async session(session, user) {
          return session
        },
        async jwt(token, user, account, profile, isNewUser) {
          return token
        },
    },
    theme: 'light',
    debug: true,
};

export default (req, res) => NextAuth(req, res, options)