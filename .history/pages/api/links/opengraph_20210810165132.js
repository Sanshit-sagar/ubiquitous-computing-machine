const ogs = require('open-graph-scraper');

async function fetchOpenGraphData = (url) => {
    const options = { url: `${url}` };
    ogs(options).then((data) => {
        const { error, result, response } = data;
        console.log('error:', error);  // T / F
        console.log('result:', result); // Results + Error body 
        console.log('response:', response); // HTML of page
        return { result, response, error };
    }); 
}

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