import axios from 'axios'
const url = 'https://cold-cell-7c15.hashably.workers.dev/api/click-stream'


export default async function handler(req, res) {
    
    fetchData().then((response) => {
        res.status(200).json({ 
            clicks: response.json()
        });
    }).catch((error) => {
        res.status(404).json({ 
            error, 
            message: 'failed' 
        })
    })        
}

const fetchData = async () => {
    const data = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return data
}
