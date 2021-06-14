import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        var userViews = await redis.hget('user::views', uid)
        if(!userViews) {
            userViews = 0
        }

        res.status(200).json({ userViews }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}