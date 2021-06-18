import NextAuth from "next-auth"
import Providers from `next-auth/providers`
// import GitHub from '../../../providers/GitHub'

export default NextAuth({
  cookies: {
      csrfToken: {
        name: 'next-auth.csrf-token',
        options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },
  providers: [
    Providers.GitHub({
      clientId: 'd2e25bc471e7add5b7d5',
      clientSecret: '31f552290aca57112e4112e9f675d3da5bd55774',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', 
    newUser: undefined,
  },
  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session(session, token) {
      session.accessToken = token.accessToken
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    },
  }
})