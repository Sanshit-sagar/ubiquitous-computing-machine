import redis from '../../../lib/redis'
import axios from 'axios';

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL', 
    error: 'Invalid URL' 
};

function serialize(slug, user, url, config, ts) {
   

    return {
        slug, 
        user,
        url, 
        config,
        createdAt: `${ts}`,
        updatedAt: `${ts}`,
        views: 0
    }; 
}

async function save_slug_transaction(slug, user, sData) {
    let response = null;

    const pipeline = await redis.pipeline();
    pipeline.hset('aliases', slug, JSON.stringify(sData)) //TODO: REPLACE ALIASES
    pipeline.hset(`aliases::${user}`, slug, JSON.stringify(sData)) //TODO
    pipeline.hincrby('user::links', user, 1)//TODO
    pipeline.exec((error, results) => {
        response = results;
    });
    return response;
}


export default async function handler(req, res) {
    let response = { 
        'redis': {}, 
        'cloudflare': {}, 
        'prisma': {}, 
        'hasError': false 
    };

    try {
        const { slug, user, url, config } = req.body
        let ts = new Date().getTime().toString()
        
        if(!slug || !user || !url) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else {
            // const sData = serialize(slug, user, url, config, ts);
            // response['redis'] = await save_slug_transaction(slug, user, sData); 

            const cfResponse = await axios({
                url: `https://analyticly.hashably.workers.dev/api/${slug}`,
                method: 'POST',
                headers: { 
                    'content-type': 'application/json',
                },
                data: { 
                    slug, 
                    owner: user, 
                    destination: url,
                    expiry: config.ttl,
                    blacklist: config.blacklist,
                    timestamp: ts
                }
            }).then(function(cfResponse) {
                response['cloudflare'] = cfResponse;
                res.status(200).json({ didSave: true, response, error: null })
            }).catch(function(cfError) {
                response['cloudflare'] = cfError;
                res.status(500).json({  didSave: false, response, error: `${cfError.message}` })
            });
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ 
            didSave: false, 
            message: 'FAILED', 
            error: error.message 
        });
    }
}