import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        // const { email } = req.query

        var userSlugs = []; 
        var allSlugs = await redis.hgetall('aliases')
        slugs.forEach(function(value, index, array) {
            userSlugs.push(value);
        })

        res.status(200).json({ slugs: userSlugs }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}