import redis from '../../../../lib/redis'

const baseUrl = `https://analyticly.hashably.workers.dev`
import { formatAndSortClicks } from '../../clicks/[email]'

async function getFormattedClicks(req, res) {
    const fetchUrl = `${baseUrl}/api/${email}`;
    
    await axios.get(fetchUrl).then((resp) => {
        data = formatAndSortClicks(resp.data.clicks);
        return { clicks: data };
    }).catch((error) => { 
        console.log(`Got an error`); 
        return { error: `${error.message}` };
    });
}
    

export default async function handler(req, res) {
    try {
        const { email } = req.query

        if(!email) {
            console.log('No email found');
            res.status(403).json({ Error: 'Bad request! No Email found' })
        } else {
            console.log(`Retrieving summary for ${email}`)
            let formattedClickstream = getFormattedClicks(email);
            
            var numUnique = await redis.zcard(`user.${email}.pageviews`)
            var maxViews = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES')
            var totalViews = await redis.llen(`clickstream.user.${email}`)
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1) 
            var collection = await redis.hgetall(`aliases::${email}`)
        
            const views = {
                numUnique: numUnique || '0',
                maxViews: maxViews[1] || '0',
                totalViews: totalViews || '0',
                numLinks: Object.entries(collection).length || '0'
            }; 

            let clickstream = [];
            clickstreamRaw.map(function(value, index) {
                let click = JSON.parse(value);
                console.log(click); 
                clickstream.push({ 
                    index,
                    click 
                });
            });

            res.status(200).json({ views, slugsByPopularity: maxViews, clickstream }); 
        }
    } catch (error) {
        res.status(400).json({ error: `${error.message}` }); 
    }
}