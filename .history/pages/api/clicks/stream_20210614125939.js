// import redis from '../../../lib/redis'

const clickStreamApi = 'https://cold-cell-7c15.hashably.workers.dev/api/click-stream'

export default async function handler(req, res) {
    try {
        const response = await fetch(url, {
            method: 'POST'
        });

        res.status(200).json({ clicks: response, message: 'success' })
    } catch (error) {
        res.status(404).json({ error })
    }
}
