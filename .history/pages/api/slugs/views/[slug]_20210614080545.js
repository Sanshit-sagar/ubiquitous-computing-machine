import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query

        const views = await redis.hget('views', slug)
        const viewsStr = JSON.stringify(views)

        res.status(200).json({ viewsStr }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}