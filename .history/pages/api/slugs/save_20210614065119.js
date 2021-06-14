import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        // const { dataToSave } = req.body
        console.log(JSON.stringify(req.body))
        res.status(200).json({ didSave: true, message: 'SUCCESS ' })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ didSave: false, message: 'FAILED', error: err.message })
    }
}