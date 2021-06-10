async rewrites() {
    return [
      {
        source: '/hashable',
        destination: '/https://router-api.hashably.workers.dev/redirect',
      },
    ]
},