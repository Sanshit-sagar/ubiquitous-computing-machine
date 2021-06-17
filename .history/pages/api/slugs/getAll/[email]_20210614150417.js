import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { email } = req.query
        
        if(email) {
            console.log("HERRREEE" + email)
            var slugs = await redis.hgetall(`aliases::${email}`) 
            res.status(200).json({ slugs }); 
        } else {
            res.status(400).json({ error: 'invalid email' }); 
        }
    } catch (error) {
        res.status(400).json({ error }); 
    }
}