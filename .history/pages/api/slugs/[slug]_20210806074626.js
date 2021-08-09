import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query
        console.log(`${slug}`)

        if(request.method==='GET') {
            var slugDetails = await redis.hget('aliases', slug)
            var details = JSON.parse(slugDetails)
            res.status(200).json({ details }); 
        } else {
            res.status(404).json({ Error: 'Method Not Allowed' });
        }
    } catch (error) {
        res.status(400).json({ Error: `Error: ${error}` }); 
    }
}