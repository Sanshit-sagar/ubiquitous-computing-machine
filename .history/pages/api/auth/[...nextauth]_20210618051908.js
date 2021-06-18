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
    pages: {},
        // signIn: '/auth/signin',
    callbacks: {
        signIn: async (user, account, profile) => {
            if (profile.verified_email === true)
              return Promise.resolve(true)
      
            return Promise.resolve(false)
        },
        redirect: async (url, baseUrl) => {
            return Promise.resolve('http://localhost:3000/dashboard')
        }
    },
    secret: process.env.JWT_SECRET,
    events: {},
    theme: 'light',
    debug: false,
});