var opengraph = require('opengraph-io')({appId: 'xxxxxx'});

const API_KEY = '453a9e17-3d5b-4ad9-90b6-44638ec02cb2'
const REQUEST_URL = `https://opengraph.io/api/1.1/site/`

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