import { NextApiRequest, NextApiResponse } from 'next'
import '../../../lib/prisma'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.status(200).json({  message: `it works` });
    } catch (error) {
        res.status(500).json({ error: `ooooooh` })
    }
}

// interface IAuditLogsProps {
//     date: Date;
//     action: string;
//     userEmail: string;
//     domain: string;
//     ipAddress: string; 
//     resource: string;
//     auditRecordNumber: crytoKey | strings
// }

export default handler