import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        console.log('@ /api/hash/info')
        const { email, hash } = req.body

        if(!hash || !hash.length) {
            res.status(400).json({ error: 'invalid hash provided' })
        }

        const hashInfoKey = `hashInfo::${hash}`;
        const hashInfo = await redis.get(hashInfoKey)
        
        const hashInfoObj = JSON.parse(hashInfo)
        console.log(hashInfoObj)
        res.status(200).json({ hashInfoObj })
    } catch (error) {
        res.status(400).kson({ error: 'Unable to retrieve views' })
    }
}