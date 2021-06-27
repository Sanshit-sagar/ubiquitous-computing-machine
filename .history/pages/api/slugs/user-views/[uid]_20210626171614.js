import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        //assumes no pagination 
        var numUnique = await redis.zcard(`user.${uid}.pageviews`)
        var maxViews = await redis.zrevrange(`user.${uid}.pageviews`, 0, -1, 'WITHSCORES')
        var totalViews = await redis.llen(`clickstream.user.${uid}`)
        var clickstream = await redis.lrange(`clickstream.user.${uid}`, 0, -1) 
        var collection = await redis.hgetall(`aliases::${uid}`)
       
        const views = {
            numUnique: numUnique || '0',
            maxViews: maxViews[1] || '0',
            totalViews: totalViews || '0',
            numLinks: Object.entries(collection).length || '0'
        }; 

        res.status(200).json({ views, slugsSortedByViews: maxViews, viewsSortedByTime: clickstream }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

// zrevrange user.sasagar@ucsd.edu.pageviews 0 -1 WITHSCORES