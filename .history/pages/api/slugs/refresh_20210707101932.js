
import redis from '../../../lib/redis';
const namor = require('namor');

export default async function handler(req, res) {
    try {
        const { category } = req.query
        let namorSlugs = generateNamorSlugs(category); 
        res.status(200).json({ namorSlugs });
    } catch(error) {
        res.status(401).json({ error: JSON.stringify(error) });
    }
}

function generateNamorSlugs(category) {
    console.log(`Category: ${category}`); 

    const oneWordSlugRandomVulgar = namor.generate({ words: 1, saltLength: 5, subset: "manly" })
    const twoWordSlugRandom = namor.generate({ words: 2, saltLength: 5 })
    const threeWordSlug  = namor.generate({ words: 3, saltLength: 0 })
    const defaultSlug = namor.generate()

    return {
        oneWordSlugRandomVulgar,
        twoWordSlugRandom,
        threeWordSlug,
        defaultSlug
    };
}