module.exports = {
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
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