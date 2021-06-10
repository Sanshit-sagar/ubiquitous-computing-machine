import redis from '../../../lib/redis'

export default async function create(req, res) {
    try {
        const { hash } = req.body

        if(!hash.length) {
            res.status(400).json({ message: 'failure, invalid keys'})
        }

        const views = await redis.incrby(`views::${hash}`, 1)
        res.status(200).json({ views });
    } catch (error) {
        res.status(400).json({ error: 'Unable to retrieve view count' })
    }
}