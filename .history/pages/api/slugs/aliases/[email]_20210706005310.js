import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { email } = req.query

        if(email && email.length) {
            var links = await redis.hgetall(`aliases::${email}`)
            
            res.status(200).json({ links }); 
        } else {
            res.status(404).json({ error: 'Invalid email provided' })
        }

    } catch (error) {
        res.status(400).json({ error }); 
    }
}

function isValid(email) {
    // implement and test with regex
    return true;
}