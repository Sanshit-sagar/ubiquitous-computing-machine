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
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "username" },
              password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        
              if (user) {
                alert(`User details: ${JSON.stringify(user)}`)
                return user
              } else {
                // If you return null or false then the credentials will be rejected
                return null
                throw '/path/to/redirect'        // Redirect to a URL
              }
            }
        })
    ],
}

export default (req, res) => NextAuth(req, res, options)