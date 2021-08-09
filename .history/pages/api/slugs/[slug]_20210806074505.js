import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query
        console.log(`${slug}`)

        if(request.method==='GET') {
            var slugDetails = await redis.hget('aliases', slug)
            var details = JSON.parse(slugDetails)
            res.status(200).json({ details }); 
        } else if(request.method === 'POST') {
            res.status(403).json({ message: 'Not Authorized' });
        }
    } catch (error) {
        res.status(400).json({ error: 'errrrrr!' }); 
    }
}