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
        timestamp: `${ts}`,
        views: 0
    }; 
}

async function redisPromise(slug, user, sData) {
    console.log(`About to save`)
    let response = null;
    let toSave = JSON.stringify(sData);
    console.log(`To Save: ${toSave}`);

    const pipeline = await redis.pipeline();
    pipeline.hset('aliases', slug, ) //TODO: REPLACE ALIASES
    pipeline.hset(`aliases::${user}`, slug, JSON.stringify(sData)) //TODO
    pipeline.hincrby('user::links', user, 1)//TODO
    pipeline.exec((error, results) => {
        response = results;
    });
    return response;
}

export async function cloudflarePromise(slug, user, url, config, ts) {
    let postBody = { 
        slug, 
        owner: user, 
        destination: url,
        expiry: config.ttl,
        blacklist: config.blacklist,
        timestamp: ts
    };
    console.log(JSON.stringify(postBody));
    
    const cloudflareResponse = await axios({
        url: `https://analyticly.hashably.workers.dev/api/${slug}`,
        method: 'POST',
        headers: { 
            'content-type': 'application/json',
        },
        data: postBody,
    })
    .then(function(cfResponse) {
        console.log(`Successfully saved ${slug}`)
        return cfResponse;
    }).catch(function(cfError) {
        console.log(`Error! ${cfError.message}`);
        return cfError;
    });
}


export default async function handler(req, res) {

    const { slug, user, url, config } = req.body
    
    if(!slug || !user || !url) {
        res.status(400).json(NOT_FOUND_ERROR);
    } else {
        const ts = new Date().getTime().toString(); 
        const sData = serialize(slug, user, url, config, ts);

        const allPromise = await Promise.all([
            redisPromise(slug, user, sData), 
            cloudflarePromise(slug, user, url, config, ts)
        ]).then((response) => {
            console.log(`Success!! ${response}`); 
            res.status(200).json({ response });
        }).catch((error) => {
            console.log(`Error!! ${error}`);
            res.status(500).json({ error: error.message });
        });
    }
}


 // } catch (error) {
    //     res.status(400).json({ 
    //         didSave: false, 
    //         message: 'Uh Oh, Encountered an unknown error', 
    //         error: `${error.message}`
    //     });
    // }
    // await cloudflareHandler(slug, user, url, config, ts)
    // .then((response) => {
    //     console.log(`Success! ${response}`);
    //     res.status(200).json({ didSave: true, message: `Successfully saved`, error: null });
    // }).catch((error) => {
    //     console.log('****Failed!');
    //     console.log(error);
    //     res.status(500).json({ didSave: true, message: `Failed! ${error.message}`, error });
    // });