import redis from '../../../lib/redis'
import axios from 'axios';

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL ', 
    error: 'Invalid URL' 
};

function serialize(slug, url, config, email) {
    return {
        slug, 
        owner: userEmail,
        destination: url, 
        options: {
            ...config,
        },
        timestamp: new Date().getTime().toString(),
        views: 0
    }; 
}

export default async function handler(req, res) {
    try {
        const { slug, userEmail, url, config } = req.body
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            let responses = { 
                redis: null
            };
                // cloudflare: null, 
                // prisma: null 
            // }; 

            const sData = serialize(slug, url, config, userEmail);
            console.log(JSON.stringify(sData));
            // console.log({ message: `Slug: ${slug}, URL: ${url}, Config: ${config}, Email: ${userEmail}` });

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(serializedData))
            pipeline.hset(`aliases::${userEmail}`, slug, JSON.stringify(serializedData))
            pipeline.hincrby('user::links', userEmail, 1)
            pipeline.exec((error, results) => {
                response = JSON.stringify(results)
                responses['redis'] = JSON.stringify(response);
            });


        
            // 3.  TODO add to prisma here
            res.status(200).json({ redisResponse })
            // console.log(`${JSON.stringify(serializedData, null, 2)}`);
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ 
            didSave: false, 
            message: 'FAILED', 
            error: error.message 
        })
    }
}