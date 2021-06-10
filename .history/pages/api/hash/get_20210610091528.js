import redis from '../../../lib/redis'

export default async function create(req, res) {

    try {
        console.log('@ /api/hash/get')

        const { hash } = req.body
        
        const userHashesKey = `user::${email}::hashes`

    } catch (error) {

    }
}