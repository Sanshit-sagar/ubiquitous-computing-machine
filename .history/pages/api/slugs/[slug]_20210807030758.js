import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query
        console.log(`${slug}`)

        if(req.method==='GET') {
            var slugDetails = await redis.hget('aliases', slug)
            var details = JSON.parse(slugDetails)
            res.status(200).json({ details }); 
        } else {
            // TODO -> 
            res.status(404).json({ Error: `Method: ${req.method} Not Allowed on Slugs` });
        }
    } catch (error) {
        res.status(400).json({ Error: `Error: ${error}` }); 
    }
}