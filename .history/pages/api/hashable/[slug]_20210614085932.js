import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query;

        const destinationData = await redis.hget('aliases', slug)
        const deserializedData = JSON.parse(destinationData)
        if(destinationData.user) {
            const userViews = await redis.hincrby('user::views', destinationData.user, 1)
        }
        const views = await redis.hincrby('views', slug, 1)

        // res.status(200).json({ 
        //     message: `Your slug is: ${slug}`, 
        //     destination: deserializedData.url,
        //     views
        // });
        res.redirect(301, `${deserializedData.url}`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}