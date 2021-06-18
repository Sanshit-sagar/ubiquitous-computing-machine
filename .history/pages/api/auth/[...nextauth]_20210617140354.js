import NextAuth from "next-auth"
import Providers from `next-auth/providers`

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
  database: process.env.DATABASE_URL,
  secret:`80ab123c6392f71190dd4db59c7e0dfe0a870d18dab547789046091048f92e94`,
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    encode: async ({ secret, token, maxAge }) => {

    },
    decode: async ({ secret, token, maxAge }) => {

    },
  },
  pages: {
    signIn: '/auth/signin',  
    signOut: '/auth/signout', 
    error: '/auth/error', 
    verifyRequest: '/auth/verify-request', // Used for check email page
    newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn(user, account, profile) { 
      return true 
    },
    async redirect(url, baseUrl) { 
      return baseUrl 
    },
    async session(session, user) { 
      return session 
    },
    async jwt(token, user, account, profile, isNewUser) { 
      return token 
    }
  },
  events: {},
  theme: 'dark',
  debug: false,
})