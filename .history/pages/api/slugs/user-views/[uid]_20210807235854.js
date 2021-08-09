import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { email } = req.query

        //assumes no pagination 
        var numUnique = await redis.zcard(`user.${email}.pageviews`)
        var maxViews = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES')
        var totalViews = await redis.llen(`clickstream.user.${email}`)
        var clickstream = await redis.lrange(`clickstream.user.${email}`, 0, -1) 
        var collection = await redis.hgetall(`aliases::${email}`)
       
        const views = {
            numUnique: numUnique || '0',
            maxViews: maxViews[1] || '0',
            totalViews: totalViews || '0',
            numLinks: Object.entries(collection).length || '0'
        }; 

        res.status(200).json({ views, slugsByNumViews: maxViews, clickstream }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

// zrevrange user.sasagar@ucsd.edu.pageviews 0 -1 WITHSCORES