import prisma from '../../../../lib/prisma'

// api/slug/get/:id
async function getSlugById(slugId) {
    const slugWithId = await prisma.slug.findUnique({ 
        where: {
            id: parseInt(`${slugId}`)
        }
    });
    return slugWithId;
}

// api/user/slugs/:active
async function getActiveUserSlugs(email) {
    const activeUserSlugs = await prisma.user.findMany({  
        where: { 
            email: `${email}` 
        },
        select: {
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            slugs: {
                select: {
                    published: true,
                }
            }
        },
    });
    return activeUserSlugs;
}

// api/user/slugs/feed
async function getAllUserSlugs(email) {
    const allSlugs = await prisma.slug.findMany({ 
        where: { 
            userEmail: `${email}` 
        } 
    });
    return allSlugs;
}

// api/slug/feed
async function getAllSlugs() {
    const allSlugs = await prisma.slug.findMany({ });
    return allSlugs;
}

// api/slug/deleteAll/:email
async function deleteAllUserSlugs(email: string) {
    let deletedSlugs = await prisma.slug.deleteMany({ 
        where: { 
            userEmail: `${email}` 
        } 
    }); 
    return deletedSlugs;
}

// api/slug/delete/:id
async function deleteSlugById(id: number) {
    let deletedSlug = await prisma.slug.delete({ 
        where: {
            id: id,
        }
     }); 
    return deletedSlug;
}

export default async function handler(req, res) {
    
    try {
        const { email, slugId, filter } = req.body;
    
        switch (req.method) {
            case 'GET':
                let retrieved = null;
                if(filter==='id' && slugId) {
                    retrieved = await getSlugById(slugId);
                } else if(filter==='active') {
                    retrieved = await getActiveUserSlugs(email);
                } else if(filter==='email' && email?.length) {
                    retrieved = await getAllUserSlugs(email);
                } else {
                    retrieved = await getAllSlugs();
                }
                res.status(200).json({ retrieved });
                break;
            case 'DELETE':
                let deleted = null; 
                if(filter==='id' && slugId) {
                    deleted = await deleteSlugById(slugId);
                } else {
                    deleted = await deleteAllUserSlugs(email);
                }
                res.status(200).json({ deleted });
                break; 
            default:
                res.setHeader('Allow', ['GET', 'PUT'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
        }
    } catch(error) {
        res.status(500).json({ error: `${error.message}` });
    }
}