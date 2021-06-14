import redis from '../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { slug, url } = req.body
        
        if(!slug || !slug.length) {
            res.status(400).json({ didSave: false, message: 'Invalid slug', error: 'Invalid slug' })
        } else if(!url || !url.length) {
            res.status(400).json({ didSave: false, message: 'Invalid URL ', error: 'Invalid URL' })
        } else {

            res.status(400).json({ didSave: true, message: `Success!, created a new alias! ${slug} -> ${url} `})
        }
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ didSave: false, message: 'FAILED', error: err.message })
    }
}