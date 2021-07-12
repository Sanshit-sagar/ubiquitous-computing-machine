import redis from '../../../../lib/redis';

export default async function handlers(req, res) {

    try {
        const { email, filter } = req.query
        let filteredData = []; 

        if(email && filter && email.length && filter.length) {
        
            if(filter==='mostViewed') {
                let mostViewedSlugs = await redis.zrevrange(`user.${email}.pageviews`, 0, -1, 'WITHSCORES');
                mostViewedSlugs.forEach(function(value, index) {
                    if(index%2===0) {
                        filteredData.push({
                            'slug': value,
                            'views': mostViewedSlugs[index + 1],
                        });
                    }
                }); 
            } else if(filter==='uniqueViews') {
                let uniqueVisitorIps = await redis.smembers(`user.${email}.visits`);
                uniqueVisitorIps.forEach(function(value, index) {
                    filteredData.push({
                        'ip': value,
                        'index': index
                    });  
                });
            } else if(filter==='allViews') {
                filteredData = await redis.lrange(`clickstream.user.${email}`, 0, -1);
            } else if(filter==='allLinks') {
                filteredData = await redis.hgetall(`aliases::${email}`);
            } 
            res.status(200).json({ filteredData });
        } else {
            res.status(401).json({ error: 'Incorrect parameters provided' });
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` });
    }
}