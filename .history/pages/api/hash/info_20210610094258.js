import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        console.log('@ /api/hash/info')
        const { hash } = req.body

        if(!hash || !hash.length) {
            res.status(400).json({ error: 'invalid hash provided' })
        }

        const isValidHash = await redis.sismember('valid_hashes', Myvn5JyLXLwmiUSgroF6WgrE7I3XCQpJ)

        const hashInfoKey = `hashInfo::${hash}`;
        const hashInfo = await redis.get(hashInfoKey)
        
        const hashInfoObj = JSON.parse(hashInfo)
        res.status(200).json(hashInfoObj)
    } catch (error) {
        res.status(400).kson({ error: 'Unable to retrieve views' })
    }
}