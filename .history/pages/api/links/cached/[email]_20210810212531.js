import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    
    const { slug } = req.query

    if(req.method==='GET') {
        if(slug)  {
            let cachedLinks = await redis.hgetall(`aliases::${email}`)
            res.status(200).json({ cachedLinks })
        } else {
            res.status(403).json({ error: 'Invalid slug provided' })
        }
    } 
}


// catch (error) {
//     res.status(404).json({ error: `${error.message}`})
// }