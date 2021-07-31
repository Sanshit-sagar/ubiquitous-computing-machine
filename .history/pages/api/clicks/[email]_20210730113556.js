const axios = require('axios');

const baseUrl = `https://analyticly.hashably.workers.dev`;

export default async function handler(req, res) {
    
    if(req.method==='GET') {
        const {email} = req.query 
        const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
        
        await axios.get(fetchUrl).then((response) => {
            const clicks = response.data.clicks
            res.status(200).json({ clicks })
        })
        .catch((error) => {
            res.status(500).json({ error: `${error.message}` })
        });
    } else {
        res.status(404).json({ error: `Invalid method ${req.method} on this resource` })
    } 
}
    