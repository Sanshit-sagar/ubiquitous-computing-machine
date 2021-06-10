import redis from '../../../lib/redis'

export default async function hash_info(req, res) {
    const resp = { 'details': {}, }
    try {
        console.log('@ /api/hash/info')
        const { hash } = req.body

        if(!hash || !hash.length) {
            res.status(400).json({ error: 'invalid hash provided' })
        } else {
            const isValidHash = await redis.sismember('valid_hashes', hash)
            if(isValidHash) {
                const hashInfoKey = `hashInfo::${hash}`;
                const hashViewsKey = `views::${hash}`;
                const pipeline = await redis.pipeline();
                pipeline.get(hashInfoKey)
                pipeline.get(hashViewsKey);
                pipeline.exec((err, results) => {
                    details = JSON.parse(results[0][1])
                    views = results[1][1];
                    res.status(200).json(resp);
                })
            } else {
                res.status(400).json({ error: 'Hash does not exist' })
            }
        }
    } catch (error) {
        res.status(400).json({ error: `Unable to retrieve views: ${error.message}` })
    }
}