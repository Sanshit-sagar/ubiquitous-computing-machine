import axios from 'axios'

const baseUrl = `https://analyticly.hashably.workers.dev`

export default async function handler(req, res) {
    const { email } = req.query
    console.log('IM HERE!')

    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
        
        await axios.get(fetchUrl).then((response) => {
            res.status(200).json({ clicks: response.data.clicks })
        }).catch((error) => { 
            res.status(500).json({ error: `${error.message}` }) 
        });
    } 
}
    
// res.status(500).json({ error: `Unauthorized request` }); 