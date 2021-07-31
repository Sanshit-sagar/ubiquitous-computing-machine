import { NextApiRequest, NextApiResponse } from 'next'
import { serializeAndStringify } from '../../../lib/api/serializers'
// import '../../../lib/prisma'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    console.log('IM HERREEE');

    try {
        const requestStr: string = JSON.stringify(_req);
        const ts = new Date().getTime().toString();
        console.log(`${requestStr} @ ${ts}`);

        res.status(200).json({ requestStr, ts });
    } catch (err) {
        res.status(500).json({ error: `${err.message}` })
    }
}