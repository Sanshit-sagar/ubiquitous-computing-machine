


export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        if(req.method==='GET') {
            if(slug)  {
                let cachedLinks = await redis.hgetall(`aliases::${email}`)
                res.status(200).json({ cachedLinks })
            } else {
                res.status(403).json({ error: 'Invalid slug provided' })
            }
        } else {
            res.status(401).json({ error: 'Not authorized' })
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })   
    }
}