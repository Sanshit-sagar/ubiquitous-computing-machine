import { NextApiRequest, NextApiResponse } from 'next'
import { serializeAndStringify } from '../../../lib/api/serializers'
// import '../../../lib/prisma'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {

    try {
        const query = _req.query;
        const headers = _req.headers; 
        const body = _req.body; 

        const ts = new Date().toLocaleString();

        console.log(`Recieved ${serializeAndStringify(body)} with ${serializeAndStringify(headers)} @ ${ts}`);
        res.status(200).json({ 
            message: 'Success', 
            timestamp: `${ts}` 
        });
    } catch (err) {
        res.status(500).json({ error: `${err.message}` })
    }
}