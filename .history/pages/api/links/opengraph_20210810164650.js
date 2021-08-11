const ogs = require('open-graph-scraper');

async function fetchOpenGraphData = () => {
    const options = { url: 'http://ogp.me/' };
    ogs(options)
    .then((data) => {
        const { error, result, response } = data;
        console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
        console.log('result:', result); // This contains all of the Open Graph results
        console.log('response:', response); // This contains the HTML of page
    })
}

export default async function handler(req, res) {
  
    try {   
        const { link } = req.body;
        if(!link) {
            res.status(403).json({ Error: 'No link provided'})
        } else {
            console.log(`Recieved ${link}, retrieving OG data now!`)
            
            
        }
    } catch (error) {
        res.status(500).json({ 'error': `${error.message}` })
    }
}