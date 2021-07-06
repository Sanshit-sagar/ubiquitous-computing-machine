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
              username: { label: "Username", type: "text", placeholder: "username", autocomplete: "off", type: "text" },
              password: { label: "Password", type: "password", placeholder: "password", autocomplete: "off", type: "password" }
            },
            async authorize(credentials, req) {
              const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        
              if (user) {
                alert(`User details: ${JSON.stringify(user)}`)
                return user
              } else {
                return null
              }
            }
        })
    ],
    callbacks: {
        async signIn(user, account, profile) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
              return true
            } else {
              return false
              // return '/unauthorized'
            }
        },
        async redirect(url, baseUrl) {
          return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
              token.accessToken = account.accessToken
            }
            return token
        },
        async session(session, token) {
            session.accessToken = token.accessToken
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, options)