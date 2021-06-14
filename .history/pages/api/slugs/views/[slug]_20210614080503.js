import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query

        const viewsObj = await redis.hget('views', slug)
        const views = viewsObj.views
        
        res.status(200).json({ views }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}