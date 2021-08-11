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
            
            let labels = [];
            let freqs = {};
            response.data.clicks.map(function (value, index) {
                let date = new Date(parseInt(value.timestamp)).toDateString();
                if(freqs[date]) {
                     freqs[date] += 1;
                } else {
                    freqs[date] = 1; 
                    labels.push({ date });
                }
            })

            res.status(200).json({ 
                clicks: response.data.clicks, 
                labels, 
                freqs 
            })
        }).catch((error) => { 
            res.status(500).json({ 
                error: `${error.message}` 
            }) 
        });
    } 
}