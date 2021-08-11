const ogs = require('open-graph-scraper-lite');

export default async function handler(req, res) {
    let resultData = null
    let errorData = null

    try {   
        const { link } = req.body;
        console.log(`Recieved ${link}, retrieving OG data now!`)
         
        const options = { url: 'http://ogp.me/' };
        ogs(options)
          .then((data) => {
            const { error, result, response } = data;

            console.log('result:', result); // This contains all of the Open Graph results
            console.log('error:', error);  // This is returns true or false. True if there was a error. The error it self is inside the results object.

            resultData = result;
            errorData = error; 
           
            console.log('response:', response); // This contains the HTML of page
          })

        res.status(200).json({ resultData, errorData });
    } catch (error) {
        res.status(500).json({ 'errorData': `${error.message}` })
    }
}