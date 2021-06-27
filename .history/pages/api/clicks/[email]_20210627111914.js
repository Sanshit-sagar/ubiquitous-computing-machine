const axios = require('axios');

const baseUrl = `https://analyticly.hashably.workers.dev`;

export default async function handler(req, res) {
    const {email} = req.query 

    const fetchUrl = `${baseUrl}/api/${email}`
    console.log(fetchUrl)
    
    await axios.get(fetchUrl)
        .then((response) => {
            // console.log(response)
            const clicks = response.data.clicks
            console.log(`Retrieved ${clicks.length} clicks`)

            // clicks.forEach((click, index) => {
                // const recordInDb = redis.hexists(`aliases::${email}`, click.
            // })
            res.status(200).json({ clicks })
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json({ error })
        })
}
    