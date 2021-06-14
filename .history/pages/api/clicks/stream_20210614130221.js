const clickStreamApiUrl = 'https://cold-cell-7c15.hashably.workers.dev/api/click-stream'

export default async function handler(req, res) {
    const response = await fetch(clickStreamApiUrl, {
        method: 'POST'
    })
    .then((response) => {
        res.status(200).json({ clicks: response, message: 'success' });
    })
    .catch((error) => {
        res.status(404).json({ error })
    })        
}
