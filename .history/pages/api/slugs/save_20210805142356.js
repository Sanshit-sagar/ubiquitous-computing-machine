import redis from '../../../lib/redis'
import axios from 'axios';

import prisma from '../../../lib/prisma'
import user from '../../../lib/prisma'

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

async function createSlug(slug, email:, url, config) {

    const createSlug = await prisma.slugs.create({
        data: {
            slug: slug,
            destination: url,
            published: true,
            user: { 
                connect: { 
                    userEmail: email 
                } 
            }, 
        },
    });
    return createSlug; 
}

export default async function handler(req, res) {
    try {
        const { slug, email, url, config } = req.body

        console.log('HERRRRREE');
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            // serialization needed for Cloudflare KV and ioedis 
            // const sData = serialize(slug, url, config, userEmail);
            console.log('About to save to prisma');
            console.log(`Slug: ${slug}`);
            console.log(`URL: ${url}`);
            console.log(`Config: ${config}`);
            console.log(`Email: ${email}`);

            let email = user;
            await createSlug(slug, email, url, config)
            .then((response) => {
                console.log(JSON.stringify(response))
                res.status(200).json({ response });
            })
            .catch((error) => {
                console.log(error.message);
                res.status(500).json({ error: `${error.message}` });
            });
         

            // 3.  TODO add to prisma here
            // res.status(200).json({ newSlug: serializedData, message: 'Success!' })
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