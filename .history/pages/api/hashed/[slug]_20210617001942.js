import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug } = req.query; 
        res.status(200).json({ slug, message: 'SUCCESS! '})
    } catch (error) {
        res.status(400).json({ error })
    }
}
