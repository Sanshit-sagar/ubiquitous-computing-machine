
const API_KEY = '453a9e17-3d5b-4ad9-90b6-44638ec02cb2'

var opengraph = require('opengraph-io')({
    appId: API_KEY, 
    cacheOk: true, // If a cached result is available, use it for quickness
    useProxy: false,  // Proxies help avoid being blocked and can bypass capchas
    maxCacheAge: 432000000, // The maximum cache age to accept
    acceptLang: 'en-US,en;q=0.9', // Language to present to the site. 
    fullRender: false // This will cause JS to execute when rendering to deal with JS dependant sites
});

export default async function handler(req, res) {
  
    try {   
        const { link } = req.body;
        
        if(!link) {
            res.status(403).json({ Error: 'No link provided'})
        } else {
            console.log(`Recieved ${link}, retrieving OG data now!`)
            Promise.resolve(fetchOpenGraphData)
                .then((resp) => {
                    await resp.json()
                })
                .then((data) => {
                    console.log(data.response);
                    res.status(200).json({ data });
                })
                .catch((err) => {
                    console.log(`${err.message}`)
                    res.status(500).json({ err });
                })
        }
    } catch (error) {
        res.status(500).json({ 'error': `${error.message}` })
    }
}