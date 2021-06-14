import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query

        const views = await redis.hget('views', slug)
        res.status(200).json({ views }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}