import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {

        const { email } = req.body
        if(email && email.length && isValid(email)) {
            var allSlugs = await redis.hgetall(`aliases::${email}`)
            res.status(200).json({ allSlugs, slugs: allSlugs }); 
        }
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

function isValid(email) {
    // implement and test with regex
    return true;
}