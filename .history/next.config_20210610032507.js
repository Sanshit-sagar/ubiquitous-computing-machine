module.exports = {
    async rewrites() {
        return [
          {
            source: '/about/:slug',
            destination: '/api/hashable/index',
          },
        ]
    },
}