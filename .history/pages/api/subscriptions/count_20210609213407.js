import redis from '../../../lib/redis'

export default async function count(req, res) {
    
    var numSubscribers = await redis.scard('email_subscriptions')
    res.status(201).json({
        body: 'success',
        numSubscribers
    })
}
