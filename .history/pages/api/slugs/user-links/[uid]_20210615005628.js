import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        var userLinks = await redis.hget('user::numLinks', uid)
        if(!userLinks) {
            userLinks = 0
        }

        res.status(200).json({ userLinks }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}