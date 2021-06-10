import redis from '../../../lib/redis'

export default async function create(req, res) {

    try {
        var hashObj = {
            random: '77889910'
        }
        
        res.status(200).json({ hashObj })
    } catch (error) {
        res.status(400).json({ message: 'Unable to generate a random hash. Try again' })
    }
}
