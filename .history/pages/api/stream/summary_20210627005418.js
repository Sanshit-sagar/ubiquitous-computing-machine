import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { uid } = req.query

        var numUnique = await redis.zcard(`user.${uid}.pageviews`)
        
        var maxViews = await redis.zrevrange(`user.${uid}.pageviews`, 0, -1, 'WITHSCORES')
        console.log(maxViews)
        
        var totalViews = await redis.llen(`clickstream.user.${uid}`)
        console.log(totalViews)

        // const uniqueViews = await redis.scard(`page.${slug}.visits`) 
        // const dailyViews = await redis.scard(`clickstream.${dayIndex}.${slug}.visits`) 
        const views = {
            numUnique: `${numUnique}` || '0',
            maxViews:`${maxViews}` || '0',
            totalViews: `${totalViews}` || '0'
        }; 

        res.status(200).json({ views }); 
    } catch (error) {
        res.status(400).json({ error }); 
    }
}

// zrevrange user.sasagar@ucsd.edu.pageviews 0 -1 WITHSCORES -> SLUGS SORTED ON MOST VISITED
// 1) "brawny-forge-reprimand-da3bt"
// 2) "3"
// 3) "hostile-cutlass-encode-uph7f"
// 4) "2"
// 5) "hardened-bacon-stuff-1e4ci"
// 6) "2"


// zcard