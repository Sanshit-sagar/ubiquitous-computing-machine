
import redis from '../../../../lib/redis'


function extractFields(fields) {
    let ip = fields.visitor?.ip || ''; 
    let country = fields.geodata?.country || '';
    let destination = fields.destination || ''; 

    return { ip, country, destination };
}

function incrementMaps(allMaps, extractedFields) {
    let { ip, country, destination, timestamp } = extractedFields

    allMaps.ips[ip].count += 1; 
    allMaps.countries[country].count += 1
    allMaps.destinations[destination].count += 1
    
    // allMaps.ips.dates.add(parseInt(timestamp));
    // allMaps.countries.dates.add(parseInt(timestamp));
    // allMaps.destinations.dates.add(parseInt(timestamp));
}


export default async function handler(req, res) {

    let ips = { count: 0 };
    let countries = { count: 0 };
    let destinations = { count: 0 };
    let allMaps = { ips, countries, destinations }

    try {
        const { email } = req.query 

        if(!email) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    
            let clickstream = []
            clickstreamRaw.map(function(value, index) {
                let fields = JSON.parse(value);
                
                let { ip, country, destination } = extractFields(fields) 
                allMaps.ips[ip].count += 1; 
                allMaps.countries[country].count += 1
                allMaps.destinations[destination].count += 1

                clickstream.push({ index, fields });
            });
            res.status(200).json({ ...allMaps, clickstream })
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })
    } 
}