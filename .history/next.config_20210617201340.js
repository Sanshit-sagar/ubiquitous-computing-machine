module.exports = {
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