import redis from '../../../lib/redis'
import axios from 'axios';

const NOT_FOUND_ERROR = { didSave: false, message: 'Invalid URL ', error: 'Invalid URL' };

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

        // console.log(`Slug: ${slug}`);
        // console.log(`Url: ${url}`);
        // console.log(`Config: ${JSON.stringify(config)}`);
        // console.log(`UserEmail: ${userEmail}`);
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            // var response = ''
            
            const serializedData = serialize(slug, url, config, userEmail);
                
            // 1.
            ///// TODO: update the redis endpoints here endpoints 
            // const pipeline = await redis.pipeline();
            // pipeline.hset('aliases', slug, JSON.stringify(serializedData))
            // pipeline.hset(`aliases::${userEmail}`, slug, JSON.stringify(serializedData))
            // pipeline.hincrby('user::links', userEmail, 1)
            // pipeline.exec((error, results) => {
            //     response = JSON.stringify(results)
            //     console.log(response)
            // });

            // 2.
            // oldurl -> `https://late-term-66c5.hashably.workers.dev`,
            // todo: add the rest of the user data to the body here 
            // const cfResponse = await axios({
            //     url: `https://analyticly.hashably.workers.dev/api/${slug}`,
            //     method: 'POST',
            //     headers: { 
            //         'content-type': 'application/json' 
            //     },
            //     data: { 
            //         slug, 
            //         owner: userEmail, 
            //         destination: url,
            //         expiry: config.ttl,
            //         blacklist: config.blacklist
            //     }
            // }).then(function(response) {
            //     console.log(response);
            // }).catch(function(error) {
            //     console.log(error);
            // })

            // 3.
            //todo: add to prisma here
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