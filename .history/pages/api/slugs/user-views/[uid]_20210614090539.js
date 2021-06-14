import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        var views = await redis.hget('user::views', uid)
        if(!views) {
            views = 0
        }

        res.status(200).json({ views }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}