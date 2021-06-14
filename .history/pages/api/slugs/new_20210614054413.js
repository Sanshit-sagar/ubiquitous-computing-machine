import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const slug = "abcdefg"
        res.status(200).json({ data: slug })
    } catch(error) {
        res.status(400).json({ error: JSON.stringify(error) });
    }
}