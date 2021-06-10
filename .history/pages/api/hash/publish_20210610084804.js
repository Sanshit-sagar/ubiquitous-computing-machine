import redis from '../../../lib/redis'

export default async function create(req, res) {
    var response = ''
    console.log("*** /api/hash/publish")

    try {    
        const { hash, email, content } = req.body

        console.log(`hash:${hash}---email:${email}`)

        if(!hash.length || !isValid(email)) {
            res.status(400).json({ error: 'invalid input' })
        }

        const hashKey = `valid_hashes`
        const hashDetailsKey = `hash_content::${hash}`
        const userHashKey = `user::${email}::valid_hashes`
        const userHashDetailsKey = `user::${email}::hashInfo`

        console.log(userHashDetailsKey)
        
        const userNumHashesKey = `user::${email}::num_hashes`
        const globalNumHashesKey = `num_hashes`
        const viewsKey = `views::${hash}` //set to 0
        
        const serializedContent =  JSON.stringify(content)

        const pipeline = await redis.pipeline();
        pipeline.sadd(`${hashKey}`, hash);
        pipeline.hset(`${hashDetailsKey}`, hash, serializedContent);
        pipeline.sadd(`${userHashKey}`, hash);
        pipeline.hset(`${userHashDetailsKey}`, hash, serializedContent);
        pipeline.incrby(`${userNumHashesKey}`, 1);
        pipeline.incrby(`${globalNumHashesKey}`, 1);
        pipeline.incrby(`${viewsKey}`, 1);
        pipeline.exec((err, results) => {
            response = JSON.stringify(results)
            console.log(response)
        });
          
        res.status(200).json({ didPublish: true, error: null, message: response })
    } catch (error) {
        res.status(400).json({ didPublish: false, error: error.message, message: response })
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