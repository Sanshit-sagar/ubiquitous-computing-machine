
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'

const options = {
  site: process.env.NEXTAUTH_URL,
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
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Email({
      server: {
        port: 465,
        host: 'smtp.gmail.com',
        secure: true,
        auth: {
          user: 'sanshit.sagar@gmail.com',
          pass: '50480kl!',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: 'sanshit.sagar@gmail.com'
    }),
    Providers.Google({
      clientId: '861198350688-kssro6egps13h3skj93ip0hrehg3qkl4.apps.googleusercontent.com',
      clientSecret: 's3PW9rbLIBzdwzAJ8f66ww3q',
    }),
    Providers.GitHub({
      clientId: 'd2e25bc471e7add5b7d5',
      clientSecret: '31f552290aca57112e4112e9f675d3da5bd55774',
    }),
  ],
  database: 'redis://:51f764b2da8f4466972ac4d7ed2610f6@us1-enabled-mudfish-33256.upstash.io:33256',
  secret: '80ab123c6392f71190dd4db59c7e0dfe0a870d18dab547789046091048f92e94',
  session: {
    jwt: true,
  },
  jwt: {
    // encode: async ({ secret, token, maxAge }) => {
    // decode: async ({ secret, token, maxAge }) => {}
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
      res.redirect({
        statusCode: 301,
        route: '/links',
    })},
    async redirect(url, baseUrl) { return url.startsWith(baseUrl) ? url : base },
    async session(session, user) { return session },
    async jwt(token, user, account, profile, isNewUser) {  return token },
  },
  events: {},
  theme: 'light',
  debug: false,
  
}
export default (req, res) => NextAuth(req, res, options)
