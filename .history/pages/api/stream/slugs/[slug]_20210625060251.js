import redis from '../../../../lib/redis'
import getChronologicalIndicies from '../../../../lib/realtime/chrono' 

export default async function(req, res) {

    try {
        const { slug, email } = req.query 
        console.log(`HERE: ${JSON.stringify(slug)} with ${email}`)

        const { dayIndex, weekIndex, monthIndex } = getChronologicalIndicies()

        const totalViews = await redis.zscore(`user.${email}.pageviews`, `${slug}`)
        const uniqueViews = await redis.scard(`page.${slug}.visits`) 
        const dailyViews = await redis.scard(`page.${dayIndex}.${slug}.visits`) 
        
        var views = {
            'total': totalViews || '0',
            'unique': uniqueViews || '0',
            'daily': dailyViews || '0'
        };

        res.status(200).json({ views }) 
    } catch (error) {
        res.status(404).json({ error, message: 'failed' })
    }
}