import redis from '../../../lib/redis'
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { slug, url, config, userEmail } = req.body

        console.log(`Slug: ${slug}`);
        console.log(`Url: ${url}`);
        console.log(`Config: ${JSON.stringify(config)}`);
        console.log(`UserEmail: ${userEmail}`);
        
        if(!slug || !slug.length) {
            res.status(400).json({ didSave: false, message: 'Invalid slug', error: 'Invalid slug' })
        } else if(!url || !url.length) {
            res.status(400).json({ didSave: false, message: 'Invalid URL ', error: 'Invalid URL' })
        } else {
            var response = ''
            
            const serializedData = { 
                slug, 
                url, 
                config,
                user: userEmail,
                timestamp: new Date().getTime().toString(),
                views: 0
            }
            // console.log(`$$$${JSON.stringify(serializedData)}`);

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(serializedData))
            pipeline.hset(`aliases::${userEmail}`, slug, JSON.stringify(serializedData))
            pipeline.hincrby('user::links', userEmail, 1)
            pipeline.exec((error, results) => {
                response = JSON.stringify(results)
                console.log(response)
            });

            const cfResponse = await axios({
                url: `https://late-term-66c5.hashably.workers.dev`,
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                data: { 
                    slug, 
                    owner: userEmail, 
                    destination: url,
                    expiry: config.ttl,
                    blacklist: config.blacklist
                }
            }).then(function(response) {
                console.log(response);
            }).catch(function(error) {
                console.log(error);
            })
            

            res.status(400).json({ 
                didSave: true, 
                message: `Success!, created a new vanity URL! ${slug} will redirect users to ${url}`, 
                response 
            })
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