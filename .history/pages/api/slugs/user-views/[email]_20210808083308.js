import redis from '../../../../lib/redis'
import axios from 'axios'
var parser = require('ua-parser-js');

// const baseUrl = `https://analyticly.hashably.workers.dev`

// import { formatAndSortClicks } from '../../clicks/[email]'

// async function getFormattedClicks(email) {
//     const fetchUrl = `${baseUrl}/api/${email}`;
    
//     await axios.get(fetchUrl).then((resp) => {
//         data = formatAndSortClicks(resp.data.clicks);
//         return data;
//     }).catch((error) => { 
//         console.log(`Got an error`); 
//         return []; 
//     });
// }
// keep a cursor of last seen -> maybe clear KV store/DObject once seen, every time then the next batch will be new
// lpush, zadd, up till then
// now the stats are up to date

//INITIALLY JUST RUN THROUGH THE FORMATTED CLICKS, KEEP A MAP AND RETURN THAT FOR THE GRAPHS
//THEN CLEAN UP THE APII!!
    

export default async function handler(req, res) {
   
    const { email } = req.query
    
    try {
        if(!email) {
            console.log('No email found');
            res.status(403).json({ Error: 'Bad request! No Email found' })
        } else {
            
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
            let ua = parser(useragent);

            clickstreamRaw.map(function(value, idx) {
                let click = JSON.parse(value);

                let ua = parser(value)
                var browser = ua.browser.name
                var os = ua.os.name
                var engine = ua.engine.name
                
                clickstream.push({ 
                    index: click.index,
                    'slug': click.slug,
                    'destination': click.destination,
                    'owner': click.owner,
                    'key': click.key || '',
                    'os': os,
                    'engine': engine,
                    'browser': browser,
                    ...click.visitor, 
                    ...click.geodata, 
                    ...click.misc,
                });
            });
            res.status(200).json({ ...clickstream, slugsByPopularity: maxViews })
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` })
    }
}