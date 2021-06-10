import redis from '../../../lib/redis'

export default async function create(req, res) {

    try {
        console.log('@ /api/hash/get')
        const { email, hash } = req.body

        if(!email || !email.length) {
            res.status(400).json({ error: 'invalid email provided' })
        }

        if(hash && hash.length) {
            const userHashesKey = `user::${email}::hashInfo`;
            const hashInfo = await redis.hget(userHashesKey, hash)
            res.status(200).json({ hashInfo })
        } else {
            const numGlobalHashes = await redis.get(`num_hashes`)
            res.status(200).json({ numGlobalHashes }) 
        }
    } catch (error) {

        res.status(400).kson({ error: 'Unable to retrieve views' })
    }
}