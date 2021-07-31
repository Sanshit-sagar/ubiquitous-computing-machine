import { NextApiRequest, NextApiResponse } from 'next';
import getChronologicalIndicies from '../../../lib/realtime/chrono'
// import { updateUserClickstream } from '../../../lib/realtime/redisQueries'

async function handler(_req: NextApiRequest, res: NextApiResponse) {

    try {
        // const userId = 'sanshit.sagar@gmail.com'
        const indicies = getChronologicalIndicies();
        const { dayIndex, weekIndex, monthIndex }  = indicies;   
        res.status(200).json(`${dayIndex} | ${weekIndex} | ${monthIndex}`);
    } catch (error) {
        res.status(500).json({ error: `${error.message}` })
    }

}

export default handler


// const { 
//     clickstream_user,
//     clickstream_user_day,
//     clickstream_user_week,
//     clickstream_user_month
// } = await updateUserClickstream(indicies)