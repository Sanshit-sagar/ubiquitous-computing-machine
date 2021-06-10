import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        var response = ''
        const { hash, email, content } = req.body

        console.log(`hash:${hash}---email:${email}`)

        if(!hash.length || !isValid(email)) {
            res.status(400).json({ error: 'invalid input' })
        }

        const allHashesKey = `hashes`
        const hashDetails = `hashInfo::${hash}`
        const userHashesKey = `user::${email}::hashes`
        const userDetailsKey = `user::${email}`
        const viewsKey = `views::${hash}`
        
        const serializedContent =  JSON.stringify(content)

        const pipeline = await redis.pipeline();
        pipeline.sadd(`${hashesKey}`, hash);
        pipeline.sadd(`${userHashesKey}`, hash);
        pipeline.hset(`${hashesDetailsKey}`, hash, serializedContent);
        pipeline.hincrby(`${userHashesDetailsKey}`, 'num_hashes', 1);
        pipeline.set(`${viewsKey}`, 0);
        pipeline.exec((err, results) => {
            response = JSON.stringify({ results })
            console.log(response)
        });
          
        res.status(200).json({ didPublish: true, error: null, message: response })
    } catch (error) {
        res.status(400).json({ didPublish: false, error: error.message })
    }
}

const isValid = (email) => {
    return (email.length > 5)
}


// pipeline.zadd(hashablesKey, initialScore, hash);
// increment user posts, total posts
// const hash = `hashable:${hash}`
// redis.pipeline()
    // redis.sadd(hashables, hash)
    // redis.hset(hash, JSON.stringify({ user: email, destination: destinationUrl }))