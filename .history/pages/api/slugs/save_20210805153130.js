import redis from '../../../lib/redis'
import axios from 'axios';

// import prisma from '../../../lib/prisma'

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL ', 
    error: 'Invalid URL' 
};

// function serialize(slug, url, config, email) {
//     return {
//         slug, 
//         owner: userEmail,
//         destination: url, 
//         options: {
//             ...config,
//         },
//         timestamp: new Date().getTime().toString(),
//         views: 0
//     }; 
// }
// type UserCreateInputProps {
//     slug: string,
//     destination: string,
//     published?: boolean,
//     active?: boolean
// };

// async function createSlug(slug, email, url, config) {

//     const createSlug = await prisma.slugs.create({
//         data: {
//             slug: slug,
//             destination: url,
//             published: true,
//             user: { 
//                 connectOrCreate: { 
//                     where: {
//                         email: email,
//                     },
//                 },
//             }, 
//         },
//         include: {
//             user: true,
//         },
//     });
//     return createSlug; 
// }

export default async function handler(req, res) {
    try {
        const { slug, userEmail, url, config } = req.body
    

        // console.log('HERRRRREE');
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            // serialization needed for Cloudflare KV and ioedis 
            // const sData = serialize(slug, url, config, userEmail);
            console.log({ message: `Slug: ${slug}, URL: ${url}, Config: ${config}, Email: ${userEmail}` });

            const pipeline = await redis.pipeline();
            pipeline.hset('aliases', slug, JSON.stringify(serializedData))
            pipeline.hset(`aliases::${userEmail}`, slug, JSON.stringify(serializedData))
            pipeline.hincrby('user::links', userEmail, 1)
            pipeline.exec((error, results) => {
                response = JSON.stringify(results)
                console.log(response)
            });

        
            // 3.  TODO add to prisma here
            res.status(200).json({ redisResponse:  })
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