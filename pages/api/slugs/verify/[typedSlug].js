
import redis from '../../../../lib/redis'

export default async function handler(req, res) {
    try {
        const { typedSlug } = req.query;

        if(typedSlug && typedSlug.length) {
            let slug = typedSlug
            console.log(`Verifying ${slug}`)

            const doesExist = await redis.hexists('aliases', `${slug}`);
            const isValid = !doesExist && slug.length > 5 && slug.length < 30
            res.status(200).json({ isValid }); 
        } else {
            res.status(500).json({ error: 'Invalid slug provided' });
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` }); 
    }
}