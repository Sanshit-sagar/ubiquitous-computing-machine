
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
    
    ips.dates.add(parseInt(timestamp));
    countries.dates.add(parseInt(timestamp));
    destinations.dates.add(parseInt(timestamp));

    return { ips, countries, destinations };
}


export default async function handler(req, res) {

    let ips = { count: 0, dates: new Set() };
    let countries = { count: 0, countries: new Set() };
    let destinations = { count: 0, destinations: new Set() };
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
                
                let extractedFields = extractFields(fields) 
                incrementMaps(allMaps, extractedFields)

                clickstream.push({ index, fields });
            });
            res.status(200).json({ ...allMaps, clickstream })
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })
    } 
}