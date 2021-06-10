import redis from '../../../lib/redis'

export default async function create(req, res) {

    try {
        console.log('@ /api/hash/info')
        const { email, hash } = req.body

        if(!email || !email.length || !hash || !hash.length) {
            res.status(400).json({ error: 'invalid email provided' })
        }

        const hashInfoKey = `hashInfo::${hash}`;
        const hashInfo = await redis.get(userHashesKey)
        
        const hashInfoObj = JSON.parse(hashInfo)
        console.log(hashInfoObj)

        res.status(200).json({ hashInfo })
       
        // else {
        //     const numGlobalHashes = await redis.get(`num_hashes`)
        //     res.status(200).json({ numGlobalHashes }) 
        // }
    } catch (error) {
        res.status(400).kson({ error: 'Unable to retrieve views' })
    }
}