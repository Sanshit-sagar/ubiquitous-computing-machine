import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    site: process.env.NEXTAUTH_URL,
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        secret: 'ILOVEICECREAM',
    },
    database: process.env.DATABASE_URL,
    pages: {
        signin: '/auth/signin'
    },
    callbacks: {
      redirect: async (url, _) => {
        if (url === '/api/auth/signin') {
          return Promise.resolve('/profile')
        }
        return Promise.resolve('/api/auth/signin')
      },
    },
    events: {},
    theme: 'light',
    debug: true,
}

export default (req, res) => NextAuth(req, res, options)