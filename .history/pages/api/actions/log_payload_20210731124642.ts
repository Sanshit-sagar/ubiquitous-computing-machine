import { NextApiRequest, NextApiResponse } from 'next'
// import { serializeAndStringify } from '../../../lib/api/serializers'
// import '../../../lib/prisma'

async function handler(_req: NextApiRequest, res: NextApiResponse) {
    // console.log('IM HERREEE');

    try {
        const request = _req
        const reqHeadersStr: string = JSON.stringify(request.headers);
        const reqBodyStr: string = JSON.stringify(request.body);
        const ts = new Date().getTime().toString();

        console.log(`${reqHeadersStr} | ${reqBodyStr} | ${ts}`);

        res.status(200).json({ message: 'SUCCESS' });
  } catch (err) {
        res.status(404).json({ message: 'FAILURE' });
  }
}

export default handler