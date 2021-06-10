// import redis from '../../../lib/redis'

export default async function create(req, res) {
    const { hash, username, email } = req.body

    try {
        const response = 'success'
        console.log(`saving ${hash} for user ${username} with email: ${email}`)
        res.status(200).json({ didPublish: true, error: null })
    } catch (error) {
        res.status(400).json({ didPublish: false, error })
    }
}
