module.exports = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
  generateEtags: true,
  poweredByHeader: false,
  async redirects() {
      return [
        {
          source: '/hashed/:slug',
          destination: '/api/hashable/:slug',
          permanent: true,
        },
      ]
  },
}