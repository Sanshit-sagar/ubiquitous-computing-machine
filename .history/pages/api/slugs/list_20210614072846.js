import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const slugs = await redis.hgetall('aliases')
        res.status(200).json({ slugs }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}