import axios from 'axios'

const baseUrl = `https://analyticly.hashably.workers.dev`


export default async function handler(req, res) {
    const { email } = req.query

    console.log(`Getting Clicks for user: ${email}`)

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        if(!email || email.length < 5) {
            res.status(401).json({ error: 'Bad Request. Invalid Email' })
        } else {
            const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
            
            // console.log(`About to fetch from ${fetchUrl}`)
            await axios.get(fetchUrl).then((response) => {
                let clicks = response.data.clicks; 
                let data = [];

                clicks.map(function(value, index) {
                    let headers = value.request_headers;
            
                    data.push({
                        id: index + 1,
                        name: `${value.name}`,
                        destination: `${value.destination}`,
                        system: `${headers.system}`,
                        country: `${headers.country}`,
                        location: `${headers.city}, ${headers.postalCode} [${headers.metroCode}]`,
                        geodata: `${headers.longitude}, ${headers.latitude}`,
                        ipAddress: `${headers.ip}`,
                        host: `${headers.host}`,
                        tlsVersion: `${headers.tlsVersion}`,
                        httpProtocol: `${headers.httpProtocol}`,
                        timestamp: `${value.timestamp}`,
                        asn: `${headers.asn || '-'}`,
                        tlsCipher: `${headers.tlsCipher || '-'}`
                    });
                });

                data.sort((a,b) => b.id - a.id);

                res.status(200).json({ 'clicks': data })
            }).catch((error) => { 
                res.status(500).json({ error: `${error.message}` }) 
            });
        }
    }
}
    
// res.status(500).json({ error: `Unauthorized request` }); 