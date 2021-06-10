import redis from '../../../lib/redis'

export default async function create(req, res) {
    const { hash, username, email } = req.body

    try {
        // redis.hset()
        res.status(200).json({ hashes, message: 'Successfully create hash!' })
    } catch (error) {
        res.status(400).json({ message: 'Unable to generate a random hash. Try again' })
    }
}
