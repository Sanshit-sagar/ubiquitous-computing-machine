import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query
        console.log(`${slug}`)

        var slugDetails = await redis.hget('aliases', slug)
        var details = JSON.parse(slugDetails)
        // var slugDetails = JSON.parse(slugDetailsSerialized)
        // var slugDetails = { 'message': 'it works!' }

        res.status(200).json({ details }); 
    } catch (error) {
        res.status(400).json({ error: 'errrrrr!' }); 
    }
}