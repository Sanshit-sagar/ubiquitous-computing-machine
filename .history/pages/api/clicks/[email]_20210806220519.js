import axios from 'axios'

const baseUrl = `https://analyticly.hashably.workers.dev`

export default async function handler(req, res) {
    const { email } = req.query
    console.log('IM HERE!')

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
        
        console.log(`About to fetch from ${fetchUrl}`)
        await axios.get(fetchUrl).then((response) => {
            console.log(`Recieved a response! ${response}`)

            let clicks = response.data.clicks; 
            let data = [];

            clicks.map(function(value, index) {
                let headers = value.request_headers;
        
                data.push({
                    id: index + 1,
                    name: `${value.slug}`,
                    destination: `${value.destination}`,
                    country: `${headers.country}`,
                    location: `${headers.city}, ${headers.postalCode}`,
                    geodata: `${headers.longitude}, ${headers.latitude}`,
                    ipAddress: `${headers.ip}`,
                    host: `${headers.host}`,
                    tlsVersion: `${headers.tlsVersion}`,
                    httpProtocol: `${headers.httpProtocol}`,
                    timestamp: `${value.timestamp}`,
                    asn: `${headers.asn || '-'}`
                });
            });

            res.status(200).json({ clicks: response.data.clicks })
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` }) 
        });
    } 
}
    
// res.status(500).json({ error: `Unauthorized request` }); 