import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug, url } = req.body
        
        if(!slug || !slug.length) {
            res.status(400).json({ didSave: false, message: 'Invalid slug', error: 'Invalid slug' })
        } else if(!url || !url.length) {
            res.status(400).json({ didSave: false, message: 'Invalid URL ', error: 'Invalid URL' })
        } else {
            var response = ''
            const timestamp = new Date().getTime().toISOString()

            const serializedData = { 
                slug, 
                url, 
                timestamp: new Date().getTime().toString()
            }

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(serializedData))
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