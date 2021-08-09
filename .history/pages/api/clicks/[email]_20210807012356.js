import axios from 'axios'
var parser = require('ua-parser-js');
const baseUrl = `https://analyticly.hashably.workers.dev`

function formatUserAgent(useragent) {
    if(!useragent) return '';
    var ua = parser(useragent)
    console.log(JSON.stringify(ua));

    return {
        'browser': ua.browser,
        'engine': ua.engine,
        'os': ua.os,
    };
}


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
            
            await axios.get(fetchUrl).then((response) => {
                let clicks = response.data.clicks; 
                let data = [];
                // console.log(JSON.stringify(clicks));

                clicks.map(function(value, index) {
                    let headers = value.request_headers;
                    let userAgent = formatUserAgent(headers.system);
                    console.log(`${Object.keys(userAgent)}`)

                    data.push({
                        id: index + 1,
                        slug: `${value.slug}`,
                        destination: `${value.destination}`,
                        os: `${userAgent['os'].name}`,
                        engine: `${userAgent['engine'].name}`,
                        browser: `${userAgent['browser'].name}`,
                        country: `${headers.country}`,
                        location: `${headers.city}, ${headers.postalCode} [${headers.metroCode}]`,
                        geodata: `${headers.longitude}, ${headers.latitude}`,
                        ipAddress: `${headers.ip}`,
                        host: `${headers.host}`,
                        tlsVersion: `${headers.tlsVersion}`,
                        httpProtocol: `${headers.httpProtocol}`,
                        timestamp: `${value.timestamp}`,
                        asn: `${headers.asn || '-'}`,
                        tlsCipher: `${headers.tlsCipher || '-'}`,
                        clientTcpRtt: `${headers.clientTcpRtt || '-'}`,
                        clientAcceptEncoding: `${headers.clientAcceptEncoding || '-'}`
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