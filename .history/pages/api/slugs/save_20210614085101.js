import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug, url, userEmail } = req.body
        
        if(!slug || !slug.length) {
            res.status(400).json({ didSave: false, message: 'Invalid slug', error: 'Invalid slug' })
        } else if(!url || !url.length) {
            res.status(400).json({ didSave: false, message: 'Invalid URL ', error: 'Invalid URL' })
        } else {
            var response = ''
            
            const serializedData = { 
                slug, 
                url, 
                userEmail,
                timestamp: new Date().getTime().toString(),
                views: 0
            }

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(serializedData))
            pipeline.hset('views', slug, 0)
            pipeline.hincrby('user::numLinks', userEmail, 1)
            pipeline.exec((err, results) => {
                response = JSON.stringify(results)
                console.log(response)
            });

            res.status(400).json({ didSave: true, message: `Success!, created a new alias! ${slug} -> ${url}`, response })
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ didSave: false, message: 'FAILED', error: err.message })
    }
}