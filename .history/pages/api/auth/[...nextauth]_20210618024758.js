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
      async session(session, token) {
        // Add property to session, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      },
      async jwt(token, user, account, profile, isNewUser) {
        // Add access_token to the token right after signin
        if (account?.accessToken) {
          token.accessToken = account.accessToken
        }
        return token
      }
    },
    events: {
      async signin(user, account, isNewUser) {
        console.log(`User with account ID: ${account} is now signed in.`);
        console.log(`First time: ${isNewUser.toString()}`);
      },
      async session(session, jwt) {
        console.log(`Session ${session} is ending along with JWT: ${jwt && jwt.length ? jwt : 'N/A'}`)
      },
      async error() {
        console.log(`ERROR: error.message`)
      }
    },
    theme: 'light',
    debug: true,
});