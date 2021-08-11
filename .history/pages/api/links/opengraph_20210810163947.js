const ogs = require('open-graph-scraper-lite');

export default async function handler(req, res) {
  
    try {   
        const { link } = req.body;
        console.log(`Recieved ${link}, retrieving OG data now!`)
         
        const options = { url: `${link}` };
        ogs(options)
          .then((data) => {
            const { error, result, response } = data;

            console.log('result:', result); // OG Results
            console.log('error:', error); // T or F
            console.log('response:', response); // This contains the HTML of page

            if(error) {
                res.status(404).json({ 'error': result });
            } else {
                res.status(200).json({ result })
            }
          })
          .catch((error) => {
                console.log(`${error.message}`);
                res.status(500).json({ 'error': `${error.message}` })
          })
    } catch (error) {
        res.status(500).json({ 'error': `${error.message}` })
    }
}