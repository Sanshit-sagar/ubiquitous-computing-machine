// import redis from '../../../lib/redis'

export default async function create(req, res) {
    
    try {
        const { hash, email } = req.body

        if(!hash.length || !isValid(email)) {
            res.status(400).json({ error: 'invalid input' })
        }

        const response = `success, saving ${hash} for user: ${email}`;
        res.status(200).json({ didPublish: true, error: null, message: response })
    } catch (error) {
        res.status(400).json({ didPublish: false, error: error.message })
    }
}

const isValid = (email) => {
    return (email.length > 5)
}