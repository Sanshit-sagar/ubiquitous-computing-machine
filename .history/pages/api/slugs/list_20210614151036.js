import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        // const { email } = req.query

        var userSlugs = []; 
        var allSlugs = await redis.hgetall('aliases')

        Object.entries(allSlugs).map(function(value, index) {
            if(value) {
                userSlugs.push(value);
            }
        });

        res.status(200).json({ allSlugs, slugs: userSlugs }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}