import { NextApiRequest, NextApiResponse } from 'next'
import '../../../lib/prisma'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {

    try {
        const query = _req.query;
        const body = _req.body; 

        console.log(`Recieved ${body} @ ${new Date().toLocaleString()}`);
        res.status(200).json({ message: 'Success' });
    } catch (err) {
        res.status(500).json({ error: `${err.message}` })
    }
}