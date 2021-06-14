// import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        // const { dataToSave } = req.body
        console.log(JSON.stringify(req.body.dataToSave))
        res.status(200).json({ message: 'SUCCESS ' })
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: 'FAILED' })
    }
}