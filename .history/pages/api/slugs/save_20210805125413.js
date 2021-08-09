import redis from '../../../lib/redis'
import axios from 'axios';

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL ', 
    error: 'Invalid URL' 
};

function serialize(slug, url, config, userEmail) {
    return {
        slug, 
        url, 
        ...config,
        user: userEmail,
        timestamp: new Date().getTime().toString(),
        views: 0
    }; 
}

export default async function handler(req, res) {
    try {
        const { slug, url, config, userEmail } = req.body
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            const serializedData = serialize(slug, url, config, userEmail);
                
            

            // 3. todo: add to prisma here
            res.status(200).json({ newSlug: serializedData, message: 'Success!' })
            console.log(`${JSON.stringify(serializedData, null, 2)}`);
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ 
            didSave: false, 
            message: 'FAILED', 
            error: err.message 
        })
    }
}