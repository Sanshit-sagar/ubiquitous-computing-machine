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
        }),
    ],
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60,
      updateAge: 24 * 60 * 60, 
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
      async signIn(user, account, profile) {
        const isAllowedToSignIn = true;
          if (isAllowedToSignIn) {
              return true
          } else {
              return false
          }
      },
      async redirect(url, baseUrl) {
        return url.startsWith(baseUrl) ? url : baseUrl
      },
      async session(session, user) {
        return session
      },
      async jwt(token, user, account, profile, isNewUser) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken
        }
        return token
      },
    events: {},
    theme: 'light',
    debug: true,
});