import redis from '../../../lib/redis'
import axios from 'axios';

import prisma from '../../../lib/prisma'

const NOT_FOUND_ERROR = { 
    didSave: false, 
    message: 'Invalid URL ', 
    error: 'Invalid URL' 
};

function serialize(slug, url, config, userEmail) {
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

async function createSlug(slug, destination, config, email) {
    
    const createSlug = await prisma.slug.create({
        data: {
            slug: slug,
            destination: destination,
            published: true,
            user: { 
                connect: { 
                    email: email 
                } 
            }, 
        },
    });
    return createSlug; 
}

export default async function handler(req, res) {
    try {
        const { slug, url, config, userEmail } = req.body

        console.log('HERRRRREE');
        
        if(!slug || !slug.length) {
            res.status(400).json(NOT_FOUND_ERROR);
        } else if(!url || !url.length) {
            res.status(400).json(NOT_FOUND_ERROR); 
        } else {
            // serialization needed for Cloudflare KV and ioedis 
            // const sData = serialize(slug, url, config, userEmail);
            await createSlug(slug, url, config, userEmail)
         

            // 3.  TODO add to prisma here
            // res.status(200).json({ newSlug: serializedData, message: 'Success!' })
            // console.log(`${JSON.stringify(serializedData, null, 2)}`);
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