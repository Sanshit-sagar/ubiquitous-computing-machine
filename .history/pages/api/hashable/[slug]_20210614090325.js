import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        const destinationData = await redis.hget('aliases', slug)
        const deserializedData = JSON.parse(destinationData)

        if(deserializedData.user) {
            const userViews = await redis.hincrby('user::views', deserializedData.user, 1)
            console.log(`user: ${deserializedData.user} now has ${userViews} views`)
        }

        const views = await redis.hincrby('views', slug, 1)

        res.redirect(301, `${deserializedData.url}`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}