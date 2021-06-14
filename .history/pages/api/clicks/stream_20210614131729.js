const axios = require('axios');

const url = 'https://cold-cell-7c15.hashably.workers.dev/api/click-stream'

export default async function handler(req, res) {
    
    await axios.get(url)
        .then((response) => {
            console.log(response)
            res.status(200).json({ data: response })
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json({ error })
        })
}
    
//     fetchData().then((response) => {
//         res.status(200).json({ 
//             clicks: response.json()
//         });
//     }).catch((error) => {
//         res.status(404).json({ 
//             error, 
//             message: 'failed' 
//         })
//     })        
// }

// const fetchData = async () => {
    
// }



// method: 'GET',
// headers: {
//     'Content-Type': 'application/json',
// },
// })
// return data
