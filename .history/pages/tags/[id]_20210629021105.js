import redis from '../../lib/redis'

export async function handler(req, res) {
    let tagInfo = {}

    try {
        const { id } = req.parse
        const tagData = await redis.hget('tag.byid', id)
        tagInfo = JSON.parse(tagData)
        
        res.status(200).json({ tag: tagInfo })
    } catch(error) {
        res.status(500).json({ error: `Ran into an error: ${error.message}`})
    }
}