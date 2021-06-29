
export async function handler(req, res) {

    try {
        const { id } = req.parse
        const tagData = await redis.hget('tagsById', id)
        const tagDataSanitized = JSON.parse(tagData); 

        res.status(500).json({ tag: tagDataSanitized })
    } catch(error) {
        res.status(50).json({ error: `Ran into an error: ${error.message}`})
    }
}