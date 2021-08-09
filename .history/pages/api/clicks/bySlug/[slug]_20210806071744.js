import axios from 'axios'

const baseUrl = `https://analyticly.hashably.workers.dev`

export default async function handler(req, res) {
    const { slug } = req.query

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        let fetchUrl = '';
        if(!slug?.length || slug.length < 5 || slug.length > 30) {
            // todo: check if slug doesn't belong to anyone via local cache
            fetchUrl = `${baseUrl}/api/slug/all`;
        } else {
            fetchUrl = `${baseUrl}/api/slug/${bySlug}`;
        }
        console.log(`About to fetch from ${fetchUrl}`)
        await axios.get(fetchUrl).then((response) => {
            console.log(`Recieved a response! ${response}`)
            res.status(200).json({ clicks: response.data.clicks })
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` }) 
        });
    } 
}
    
// res.status(500).json({ error: `Unauthorized request` }); 