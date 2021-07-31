
import { getSelectedIdsArray } from '../../../../lib/api/helpers'

//api/slug/deleteAll/:id[]
async function deleteSelectedSlugs(email, selectedSlugs) {
    console.log(`Trying to delete ${selectedSlugs}`);
    console.log(selectedSlugs); 

    let deletedSlugs = await prisma.user.update({ 
        where: {
            email: `${email}`,
        },
        data: {
            slugs: {
                deleteMany: [...selectedSlugs],
            },
        },
    }); 
    return deletedSlugs;
}


export async function handler(req, res) {
    try {
        const { selected } = req.body;

        if(selected) {
            const selectedSlugs = getSelectedIdsArray(selected)

            switch(req.method) {
                case 'PUT':
                    res.status(200).json({ selectedSlugs })
                    break;
                case 'DELETE':
                    const deletedSlugs = await deleteSelectedSlugs(email, selectedSlugs)
                    res.status(200).json({ deletedSlugs })
                    break;
                default:
                    res.setHeader('Allow', ['GET', 'PUT'])
                    res.status(405).end(`Method ${method} Not Allowed`)
            }
        } else {
            res.status(500).json({ error: 'Invalid selection provided' })
        }
    } catch (error) {
        res.status(500).json({ error:`${error.message}` })
    }
}
