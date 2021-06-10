module.exports = {
    async redirects() {
        return [
          {
            source: '/about',
            destination: '/api/hashable/index',
            permanent: true,
          },
        ]
    },
}