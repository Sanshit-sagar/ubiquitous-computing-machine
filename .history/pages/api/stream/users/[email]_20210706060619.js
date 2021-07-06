import redis from '../../../../lib/redis'
import { updateUserClickstream } from '../../../../lib/realtime/redisQueries'
import getChronologicalIndicies from '../../../../lib/realtime/chrono'

export default async function(req, res) {
    
    const { email, time } = req.query

    const indicies = getChronologicalIndicies();
    const userKeys = await updateUserClickstream(email, indicies)

    const { 
        clickstream_user, 
        clickstream_user_day, 
        clickstream_user_week, 
        clickstream_user_month 
    } = userKeys

   
    const key = time===30 ? clickstream_user_month : (time===7) ? clickstream_user_week : (time===1) ? clickstream_user_day : clickstream_user
    const clickstream = [];

    console.log(`Using key: ${key} for time: ${time} for account: ${email}`)
   
    try {
        const originalClickstream = await redis.lrange(key, 0, -1);
        originalClickstream.forEach((click) => {
            let sanitizedClick = JSON.parse(click)
            clickstream.push(sanitizedClick);
        });
        res.status(200).json({ clickstream, email })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Unsuccessfull request, try again' })
    }
}
