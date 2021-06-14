import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        const destinationData = await redis.hget('aliases', slug)
        const deserializedData = JSON.parse(deserializedData)

        res.status(200).json({ message: `Your slug is: ${slug}` });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}