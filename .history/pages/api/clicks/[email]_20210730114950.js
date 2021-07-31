import { getSession } from 'next-auth/client'

const baseUrl = `https://analyticly.hashably.workers.dev`

// Only time the clickstream endpoint should return data,
// is when an authenticated session queries it to back up every 90s -> update SWR time config to fix this 

export default async function handler(req, res) {
    const session = await getSession();

    if(!session) {
        res.status(500).json({ error: `Unauthorized request` }); 
    }

    if(req.method==='GET') {
        const {email} = req.query 
        const fetchUrl = email?.length ? `${baseUrl}/api/${email}` : `${baseUrl}/api`
        
        await axios.get(fetchUrl)
        .then((response) => {
            res.status(200).json({ clicks: response.data.clicks })
        })
        .catch((error) => {
            res.status(500).json({ error: `${error.message}` })
        });
    } else {
        res.status(404).json({ error: `Invalid method ${req.method} on this resource` })
    } 
}
    