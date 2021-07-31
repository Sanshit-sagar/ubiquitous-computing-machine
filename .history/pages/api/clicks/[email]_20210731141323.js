import { getSession } from 'next-auth/client'

const baseUrl = `https://analyticly.hashably.workers.dev`

export default async function handler(req, res) {
    if(req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed'})
    } else {
        const session = await getSession();
        const { email } = req.query
        let userEmail = session?.user?.email || email

        if(userEmail) {
            const fetchUrl = userEmail?.length ? `${baseUrl}/api/${userEmail}` : `${baseUrl}/api`
            
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
}
    
// res.status(500).json({ error: `Unauthorized request` }); 