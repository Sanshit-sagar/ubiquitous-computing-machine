import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query

        var slugDetailsSerialized = await redis.hget('aliases', slug)
        var slugDetails = JSON.parse(slugDetailsSerialized)

        res.status(200).json({ slugDetails }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}