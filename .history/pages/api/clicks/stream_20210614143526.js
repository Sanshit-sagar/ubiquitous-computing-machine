const axios = require('axios');

const url = 'https://analyticly.hashably.workers.dev/api/click-stream'

export default async function handler(req, res) {

    await axios.get(url)
        .then((response) => {
            console.log(response)
            const clicks = response.data.clicks
            res.status(200).json({ clicks })
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json({ error })
        })
}
    