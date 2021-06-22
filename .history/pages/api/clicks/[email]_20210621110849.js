const axios = require('axios');

const baseUrl = `https://analyticly.hashably.workers.dev`;

export default async function handler(req, res) {
    const {email} = req.query 

    const data = event.request.cf !== undefined ?
      event.request.cf :
      { error: "The `cf` object is not available inside the preview." }


//     const fetchUrl = `${baseUrl}/api/${email}`
//     console.log(fetchUrl)
    
//     await axios.get(fetchUrl)
//         .then((response) => {
//             console.log(response)
//             const clicks = response.data.clicks
//             res.status(200).json({ clicks })
//         })
//         .catch((error) => {
//             console.log(error)
//             res.status(404).json({ error })
//         })
    try {
        res.status(200).json({ message: 'succes' })
    } catch (error) {
        res.status(404).json({ error })
    }
}
    