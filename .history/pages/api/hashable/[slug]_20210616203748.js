import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query;        

        const destinationData = await redis.hget('aliases', slug)
        const deserializedData = JSON.parse(destinationData)
        

        let userViews = await redis.hincrby('user::views', deserializedData.user, 1)
        let slugViews = await redis.hincrby('views', slug, 1)

        // use deserializedData (of type JSON.stringified) as secondary index for zadd

        const pipeline = await redis.pipeline();
        pipeline.hincrby('views', slug, 1);
        pipeline.set(`indexed_slug_clickscores::${slug}`, destinationData);
        pipeline.set(`indexed_user_clickscores::${user}`, destinationData);
        pipeline.zadd(`slug_clickscores`, slugViews, destinationData);
        pipeline.zadd(`user_clickscores`, userViews, destinationData); 
        pipeline.exec((err, resp) => {
            console.log(JSON.stringify(resp));
        })

        res.redirect(301, `${deserializedData.url}`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// const getHeaders = (headers) => {

//     return (
        
//     )
// }