import axios from 'axios'

const baseUrl = `https://analyticly.hashably.workers.dev`

// todo: check if slug doesn't belong to anyone via local cache
export default async function handler(req, res) {
    const { slug } = req.query

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        let fetchUrl = '';
        if(!slug?.length || slug.length < 5 || slug.length > 30) {
            fetchUrl = `${baseUrl}/api/slug/all`;
        } else {
            fetchUrl = `${baseUrl}/api/slug/${slug}`;
        }

        console.log(`About to fetch from ${fetchUrl}`)
        await axios.get(fetchUrl).then((response) => {
            console.log(`Recieved a response! ${response}`)
            res.status(200).json({ 
                id: response.data.clicks.id,
                slug: response.data.clicks.slug,
                ...response.data.clicks.request_headers,
                destination: response.data.clicks.destination,
                owner: response.data.clicks.owner,
                timestamp: response.data.clicks.timestamp,
                localeDatetime: response.data.clicks.localeDatetime,
            })
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` }) 
        });
    } 
}