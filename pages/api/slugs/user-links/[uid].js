import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        // var numUnique = await redis.zcard('user.sasagar@ucsd.edu.pageviews')
        var userViews = await redis.hget('user::views', uid)

        var views = {
            'total': totalViews || '0', // llen clickstream
            'unique': numUniqueLinks || '0', 
            'daily': dailyViews || '0' // scard user.uid.page pageview
        };

        res.status(200).json({ numUniqueLinks }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}