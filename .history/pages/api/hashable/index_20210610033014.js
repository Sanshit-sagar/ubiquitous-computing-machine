export default async function handler(req, res) {
    try {
        // const { slug } = req.query;

        res.status(200).json({ message: `Your slug is: index` });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}