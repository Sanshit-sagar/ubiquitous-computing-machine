
import redis from '../../../../lib/redis'
// import { getSession } from 'next-auth/client'
let ips = []; 
let countries = [];
let destinations = []; 

function extractFields(fields) {
    let ip = fields.visitor?.ip || ''; 
    let country = fields.geodata?.country || '';
    let destination = fields.click?.destination || ''; 

    return { ip, country, destination };
}


export default async function handler(req, res) {
    // const session = await getSession();
    try {
        const { email } = req.query 

        if(!email) {
            res.status(401).json({ error: 'Unauthorized' });
        } else {
            // todo: chain these in a pipeline
            var clickstreamRaw = await redis.lrange(`clickstream.user.${email}`, 0, -1);
    
            let clickstream = [];
            clickstreamRaw.map(function(value, index) {
                let fields = JSON.parse(value);

                let { ip, country, destination } = extractFields(fields) 

                ips.push(ip); 
                countries.push(country)
                destinations.push(destination)

            });
            res.status(200).json({ clickstream })
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })
    } 
}