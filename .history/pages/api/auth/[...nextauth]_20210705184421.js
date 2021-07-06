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
        Providers.Auth0({
            clientId: process.env.AUTH0_ID,
            clientSecret: process.env.AUTH0_SECRET,
            domain: process.env.AUTH0_DOMAIN,
        }),
    ],
    theme: 'light',
    debug: true,
}

export default (req, res) => NextAuth(req, res, options)