// import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { message } = req.body
        console.log(message)
        res.status(200).json({ message: 'SUCCESS ' })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: 'FAILED' })
    }
}