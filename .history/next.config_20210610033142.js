module.exports = {
    async redirects() {
        return [
          {
            source: '/about/:slug',
            destination: '/api/hashable/:slug',
            permanent: true,
          },
        ]
    },
}