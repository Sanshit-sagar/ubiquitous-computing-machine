import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      params: { 
        grant_type: "authorization_code" 
      },
      accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
      requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
    }),
    // ...add more providers here
  ],
});