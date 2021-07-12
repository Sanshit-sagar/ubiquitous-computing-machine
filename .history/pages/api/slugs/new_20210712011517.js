const namor = require("namor")

export default async function handler(req, res) {
    try {
        const slug = namor.generate({ words: 3, saltLength: 5, subset: "manly" })

        res.status(200).json({ slug })
    } catch(error) {
        res.status(400).json({ error: JSON.stringify(error) });
    }
}