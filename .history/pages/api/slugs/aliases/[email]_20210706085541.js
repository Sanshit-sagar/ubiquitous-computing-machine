import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { email, slug } = req.query

        if(email && email.length) {
            if(req.method === 'DELETE') {
                var deletedLink = await redis.hdel(`aliases::${email}`, `${slug}`)
                res.status(200).json({ deletedLink });                 
            } else {
                var links = await redis.hgetall(`aliases::${email}`)
                res.status(200).json({ links }); 
            }
        } else {
            res.status(500).json({ error: 'No user provided' });
        }
    } catch (error) {
        res.status(400).json({ error: `${error.message}` }); 
    }
}