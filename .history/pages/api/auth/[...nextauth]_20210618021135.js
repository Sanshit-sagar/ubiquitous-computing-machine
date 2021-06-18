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
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
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
      signIn: '/auth/signin', 
      signOut: '/auth/signout',
    },
    callbacks: {
      redirect: async (url, baseUrl) => {
        if (url.startsWith(`/api/auth/callback`)) {
          return Promise.resolve('/profile')
        }
        return Promise.resolve('/api/auth/signin')
      },
    },
    events: {},
    theme: 'light',
    debug: true,
});