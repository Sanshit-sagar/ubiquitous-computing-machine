import redis from '../../../lib/redis'
import axios from 'axios';

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL', 
    error: 'Invalid URL' 
};

function serialize(slug, user, url, config) {
    let date = new Date()

    return {
        slug, 
        user,
        url, 
        config,
        createdAt: `${date.getTime().toString()}`,
        updatedAt: `${date.getTime().toString()}`,
        views: 0
    }; 
}

export default async function handler(req, res) {
    try {
        const { slug, user, url, config } = req.body
        
        if(!slug || !user || !url) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else {
            let response = { redis: null };
            const sData = serialize(slug, user, url, config);
            console.log(JSON.stringify(sData));

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(sData))
            pipeline.hset(`aliases::${user}`, slug, JSON.stringify(sData))
            pipeline.hincrby('user::links', user, 1)
            pipeline.exec((error, results) => {
                response['redis'] = JSON.stringify(results);

            });

            console.log(response['redis']);
            res.status(200).json({ response })
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