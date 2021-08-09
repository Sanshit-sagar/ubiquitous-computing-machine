import prisma from '../../../../lib/prisma'
import { validatePutParams, validateDeleteParams } from '../../../../lib/api/validators'
import { serializeAndStringify, parseAndDeserialize } from '../../../../lib/api/serializers'
import { getSession } from 'next-auth/client'

// api/slug/get/:slug'
async function getEmponymousSlug(eponym) {
    const slugWithEponym = await prisma.slug.findUnique({ 
        where: { 
            slug: `${eponym}` 
        } 
    });
    return slugWithEponym;
}

// api/slug/publish/:slug
async function createSlug({ email, slug, destination, options }) {
    // TODO: deserialize options here

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

//api/slug/delete/:slug
async function deleteSlug(email, slug, id) {
    let deletedSlug = null;

    if(slug) {
        deletedSlug = await prisma.slug.delete({ where: { slug: `${slug}` } });
    } else {
        deletedSlug = await prisma.slug.delete({ where: { id: `${id}` } }); 
    }
    return deletedSlug;
}

export default async function handler(req, res) {
    
    try {
        const { slug } = req.query;
        const { id, email, name, destination, options } = req.body;
    
        switch (req.method) {
            case 'GET':
                const eponymousSlug = await getEmponymousSlug(slug);
                res.status(200).json({ eponymousSlug });
                break; 
            case 'PUT':
                if(validatePutParams({ slug, destination })) {
                    const createdSlug = await createSlug(email, slug, destination, options);
                    res.status(200).json({ createdSlug });
                } else {
                    res.status(500).json({ error: 'Invalid data provided' })
                }
                break;
            case 'DELETE':
                if(slug || id) {
                    const deletedSlug = await deleteSlug(email, slug, id);
                    res.status(200).json({ deletedSlug })
                } else {
                    res.status(500).json({ error: 'Invalid params for deletion' })
                }
                break; 
            default:
                res.setHeader('Allow', ['GET', 'PUT'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` })
    }
}