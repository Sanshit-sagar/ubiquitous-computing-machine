import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { email } = req.query

        if(email && email.length && isValid(email)) {
            var userSlugs = await redis.hgetall(`aliases::${email}`)
            res.status(200).json({ userSlugs }); 
        }
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

function isValid(email) {
    // implement and test with regex
    return true;
}