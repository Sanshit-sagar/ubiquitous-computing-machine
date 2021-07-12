import redis from '../../../../lib/redis';
var parser = require('ua-parser-js');

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
                let ipMap = {};
                let uniqueVisitorIps = await redis.smembers(`user.${email}.visits`);
                uniqueVisitorIps.forEach(function(value, i) {
                    ipMap[value] = []; 
                });

                let allVisits = await redis.lrange(`clickstream.user.${email}`, 0, -1);
                allVisits.forEach(function(visit, j) {
                    let visitInfo = JSON.parse(visit); 
                    let ip = visitInfo.visitor?.ip;
                    let ua = parser(`${visitInfo.visitor.system}`);
                    //initial, final visited sites and most viewed site 

                    if(ipMap[ip]) {
                        ipMap[ip].push({
                            'slug': visitInfo.slug,
                            'destination': visitInfo.destination,
                            'timestamp': visitInfo.timestamp,
                            'geodata': `${visitInfo.geodata?.city}, ${visitInfo.geodata?.country}, ${visitInfo.geodata?.postalCode}`,
                            'browser': `${ua.browser.name}`,
                            'os': `${ua.os.name}`,
                            'engine': `${ua.engine.name}`,
                        });
                    }
                }); 

                filteredData = Object.entries(ipMap)[0];

            } else if(filter==='allViews') {
                let allVisitsUnordered = await redis.lrange(`clickstream.user.${email}`, 0, -1);
                let allVisits = allVisitsUnordered.sort((a, b) => parseInt(JSON.parse(b).timestamp) - parseInt(JSON.parse(a).timestamp));

                allVisits.forEach(function(visit, index) {
                    let visitInfo = JSON.parse(visit); 
                    let dateStr = new Date(parseInt(visitInfo.timestamp)).toLocaleString();
                    let ua = parser(`${visitInfo.visitor.system}`);

                    filteredData.push({
                        'index': index, 
                        'timestamp': visitInfo.timestamp,
                        'datetime': dateStr,
                        'key': visitInfo.key,
                        'slug': visitInfo.slug,
                        'destination': visitInfo.destination,
                        'ip': visitInfo.visitor.ip,
                        'host': visitInfo.visitor.host,
                        'geodata': `${visitInfo.geodata?.city}, ${visitInfo.geodata?.country}, ${visitInfo.geodata?.postalCode}`,
                        'coordinates': `${visitInfo.geodata.longitude}, ${visitInfo.geodata.latitude}`,
                        'browser': ua.browser.name,
                        'os': ua.os.name,
                        'engine': ua.engine.name,
                        'initialTimestamp': visitInfo.misc.initialTimestamp,
                        'finalTimestamp': visitInfo.misc.finalTimestamp,
                    });
                });
            } else if(filter==='allLinks') {
                let userLinksList = await redis.hgetall(`aliases::${email}`);
                Object.entries(userLinksList).map(function(value, index) {
                    let linkInfo = JSON.parse(value[1]);
                    let dateStr = new Date(parseInt(linkInfo.timestamp)).toLocaleString();
                    let lifetime = parseInt(linkInfo.config.ttl) - parseInt(linkInfo.timestamp); 
                    let lifeleft = parseInt(linkInfo.config.ttl) - parseInt(new Date().getTime().toString()); 

                    filteredData.push({
                        'slug': `${linkInfo.slug}`,
                        'createdAt': linkInfo.timestamp,
                        'datetime': `${dateStr}`,
                        'lifetime': `${lifetime}`,
                        'lifeleft': `${lifeleft}`,
                        'destination': `${linkInfo.url}`,
                        'ttl': `${linkInfo.config.ttl}`,
                        'password': `${linkInfo.config.password}`,
                        'routingStatus': `${linkInfo.config.routingStatus}`,
                        'blacklist': [...linkInfo.config.blacklist],
                        'seoTags': [...linkInfo.config.seoTags],
                    }); 
                });
            } 
            res.status(200).json({ filteredData });
        } else {
            res.status(401).json({ error: 'Incorrect parameters provided' });
        }
    } catch (error) {
        res.status(500).json({ error: `${error.message}` });
    }
}