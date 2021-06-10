import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        console.log('HEEEREE')

        var response = ''
        const { hash, email, content } = req.body

        console.log(`hash:${hash}---email:${email}`)

        if(!hash.length || !isValid(email)) {
            res.status(400).json({ error: 'invalid input' })
        }

        const hashablesKey = `hashables`;
        const userHashablesKey = `user::${email}::hashables`
        const viewsKey = `views::${hash}`

        // console.log(userHashablesKey)
        // const viewsKey = `views::${hash}`
        // console.log(viewsKey)
        // const userHashesKey = `user::${email}::hashes` 
        // console.log(userHashesKey)
        // const serializedContent =  JSON.stringify(content)
       

        const pipeline = await redis.pipeline();
        pipeline.sadd(`${hashablesKey}`, hash);
        pipeline.sadd(`${userHashablesKey}`, hash);
        pipeline.set(viewsKey, 0);
        // pipeline.hset(userHashesKey, serializedContent);
        
        pipeline.exec((err, results) => {
            response = JSON.stringify({ results })
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